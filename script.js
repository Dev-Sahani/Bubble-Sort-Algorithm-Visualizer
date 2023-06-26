var arr = [];
var graphColor = "#14FFEC";
var swapColor = "red";

const btn1 = document.getElementById("start-button");
const btn2 = document.getElementById("sort_btn");
const btn3 = document.getElementById("demo-btn");
btn1.addEventListener("click", start);
btn2.addEventListener("click", sort);
btn3.addEventListener("click", fillDemoValues);

function fillDemoValues(){
    const input = document.getElementById("data-to-sort");
    let data = "";
    for(let i=1; i<=100; i++){
        const newData = Math.round(Math.random()*400);
        let str = newData.toString();
        if(i !== 100) str = str + " ";
        data = data + str;
    }
    console.log(data);
    input.setAttribute("value", data);
}

function toNumber(str){
    let no = 0;
    let n = str.length;
    for(let i=0; i<n; i++){
        no += (str.charAt(i)-'0');
        if(i!=n-1){
            no *= 10;
        }
    }
    return no;
}
function split(str){
    for(let i =0; i<str.length; i++){
        if(str.charAt(i)==" "){
            continue;
        }
        let l = i;
        while(i<str.length && str.charAt(i) !=" "){
            i++;
        }
        arr.push(toNumber(str.substring(l, i)));
    }
}

function start(){
    arr = [];
    const parent = document.getElementById("graph"); 
    // Removing the older data    
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
    // Adding new data:
    const data = document.getElementById("data-to-sort");
    let str = data.value;
    split(str);
    // Determining min and max height of blocks representing data
    let max = Number.MIN_SAFE_INTEGER;
    for(let i of arr){
        if(i>max) max = i;
    }
    // extraHig is factor that is used to normalize the height of the block
    let extraHig = (400/max);
    extraHig -= 0.1;
    // w determines width of the blocks
    let w = (100/arr.length);
    for(let i=1; i<=arr.length; i++){
        let block = document.createElement('div');
        block.setAttribute("id", "block-"+i);
        block.setAttribute("class", "block");
        arr[i-1] *= extraHig;
        block.style.height = arr[i-1].toString()+"px";
        block.style.width = w.toString()+"%";
        block.style.backgroundColor = graphColor;
        parent.appendChild(block);
    }
    document.getElementById("sort_btn").style.visibility = "visible";
}
function color(i,j,color){
    document.getElementById("block-"+i).style.backgroundColor = color;
    document.getElementById("block-"+j).style.backgroundColor = color;
}
function swap(i,j){
    let temp = arr[i-1];
    arr[i-1] = arr[j-1];
    document.getElementById("block-"+i).style.height = arr[j-1].toString()+"px";
    arr[j-1] = temp;
    document.getElementById("block-"+j).style.height = temp.toString()+"px";
}
const sleep = (time)=>{
    return new Promise(resolve => setTimeout(resolve, time));
}
async function sort(){
    let noOfSwaps = arr.length*(arr.length)/2;
    // Calculting the sleep time to visualize the algorithm properly
    let time = Math.floor(10000/noOfSwaps);
    for(let i=arr.length; i>=0; i--){
        for(let j=1; j<i; j++){
            // Converts the color of the blocks being swaped to red
            color(j,j+1, swapColor);
            await sleep(time);
            if(arr[j+1-1] < arr[j-1]){
                swap(j,j+1);
            }
            // Change the color of the blocks back to original color
            color(j,j+1, graphColor);
        }
    }
}