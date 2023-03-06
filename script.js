var arr = [];
var graphColor = "#14FFEC";
var swapColor = "red";

const btn1 = document.getElementById("start-button");
const btn2 = document.getElementById("sort_btn");
btn1.addEventListener("click", start);
btn2.addEventListener("click", sort);

function toNum(str){
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
        arr.push(toNum(str.substring(l, i)));
    }
}

function start(){
    arr = [];
    const parent = document.getElementById("graph");     
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
    const data = document.getElementById("data-to-sort");
    let str = data.value;
    split(str);
    let max = Number.MIN_SAFE_INTEGER;
    for(let i of arr){
        if(i>max) max = i;
    }
    let extraHig = (400/max);
    extraHig -= 0.1;
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
    console.log(arr);
    let noOfSwaps = arr.length*(arr.length)/2;
    let time = Math.floor(10000/noOfSwaps);
    console.log(time);
    for(let i=arr.length; i>=0; i--){
        for(let j=1; j<i; j++){
            color(j,j+1, swapColor);
            await sleep(time);
            if(arr[j+1-1] < arr[j-1]){
                swap(j,j+1);
            }
            color(j,j+1, graphColor);
        }
    }
    console.log(arr);
}