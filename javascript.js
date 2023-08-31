
//define global variables
const mainBoardWidth = 550; //desired width in pixels
const mainBoardHeight = 550; //desired height in pixels
let gridSize = document.getElementById('gridSize').value; //number of rows & columns to build grid. quantity will be the same in both directions.
let isMouseDown = false;
document.addEventListener('mousedown',()=>{isMouseDown=true});
document.addEventListener('mouseup', ()=>{isMouseDown=false});
let currentColor = 'rgb(0,0,0)';

let rainbowOn = false;
let rainbowCount = 0;//will be used to iterate through rainbow list
let rainbowList = ['red','orange','yellow','green','blue','indigo','violet'];

let grayscaleOn = false;


//intialize board
generateGrid(gridSize);
// changeColor();

//initialize label text to match input initial value
document.getElementById('label').textContent = `${gridSize} X ${gridSize}`;

//define etch-a-sketch container width 
let mainBoardContainer = document.getElementById("mainBoard");
mainBoardContainer.style.minWidth = `${mainBoardWidth}px`;
mainBoardContainer.style.minHeight = `${mainBoardHeight}px`;
mainBoardContainer.style.maxWidth = `${mainBoardWidth}px`;
mainBoardContainer.style.maxHeight = `${mainBoardHeight}px`;


function generateGrid(n){
    
    //function will generate grid of n x n where n is #
    //of squares.
    for (i=0; i<n; i++){
        //create div corresponding to the row
        let rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.alignItems = "stretch";
        rowDiv.style.height = `${mainBoardHeight / n}px`;
    
        for (j=0; j<n; j++){
            //create div corresponding to columns within the row
            let div = document.createElement("div");
            div.style.width = `${mainBoardWidth / n}px`;
            div.style.border = "0.5px solid rgb(200 200 200)";
            div.style.backgroundColor = "white";
            div.setAttribute('class', 'cells');
            rowDiv.appendChild(div);
        }
        document.getElementById("mainBoard").appendChild(rowDiv);
    }

    engageColorChangeListeners();
}

function engageColorChangeListeners(){
    //add event listener to change color
    let cells = document.getElementsByClassName('cells');
    // console.log('here');
    Array.from(cells).forEach(element =>{
    
        //first listener: change color with click and mouseover together
        element.addEventListener('mouseover',()=>{
            if(isMouseDown){
                element.style.backgroundColor = currentColor;
                //specific check for rainbow mode
                if (rainbowOn){
                    rainbowCount++;
                    // console.log(rainbowCount);
                    currentColor = rainbowList[rainbowCount % rainbowList.length];
                    element.style.backgroundColor = currentColor;
                }
            }
        });
        
        //same code as above but
        //address edge case so the first cell that is clicked changes color
        //allows user to click individual cells
        element.addEventListener('mousedown', ()=>{
            if (rainbowOn){
                // console.log(rainbowCount);
                currentColor = rainbowList[rainbowCount % rainbowList.length];
                element.style.backgroundColor = currentColor;
                rainbowCount++;
            }
            element.style.backgroundColor = currentColor;
            // console.log(rainbowCount);
        });
    
    });

}

//function clears to grid to avoid duplicating grids
function clearGrid(){

    let parent = document.getElementById('mainBoard');
    let child = parent.lastElementChild;
    while (child){
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

//change slider text with slider
const slider = document.querySelector('#gridSize');
// console.log(slider.value)
slider.addEventListener("input",()=>{
    // console.log(slider.value)
    document.getElementById('label').textContent = `${slider.value} X ${slider.value}`;
    clearGrid();
    generateGrid(slider.value);
    // changeColor();
})

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input',()=>{
    currentColor = colorPicker.value;
    chooseMode();

})

function expandMenu() {
    document.getElementById('sideMenu').style.width = '250px';
    // console.log('inside!');
}

function collapseMenu() {
    // console.log('outside!');
    document.getElementById('sideMenu').style.width = '65px';
}


function resetBackground(){
    // function clears out background color on all cells.
    // console.log('clear!');
    cells = document.getElementsByClassName('cells');
    Array.from(cells).forEach(element=>element.style.backgroundColor = '');
    // document.getElementById('colorPicker').value = '#000000';
}

//function clears styling of icons. specifically filter: invert(100%).
//makes all previously white icons, grey
function clearIconStyle(){
    let icons = document.getElementsByClassName('icons');
    Array.from(icons).forEach(element=>element.removeAttribute('style'))
}

//function enables eraser mode
function eraserMode(){
    currentColor = "";
    rainbowOn = false;
    grayscaleOn = false;
    //highlight image icon to indicate selection
    clearIconStyle();
    document.getElementById('eraserImg').style.filter='invert(100%)';
}

//function enables choose mode
function chooseMode(){
    currentColor = document.getElementById('colorPicker').value;
    rainbowOn = false;
    grayscaleOn = false;
    //highlight image icon to indicate selection
    clearIconStyle();
    document.getElementById('chooseImg').style.filter='invert(100%)';
    
}

//function enables rainbow mode
function rainbowMode(){
    rainbowOn = true;
    grayscaleOn = false;
    // currentColor = rainbowList[rainbowCount % rainbowList.length];
    //highlight image icon to indicate selection
    clearIconStyle();
    document.getElementById('rainbowImg').style.filter='invert(100%)';
    // console.log(currentColor);
}

function grayscaleMode(){
    grayscaleOn = true;
    rainbowOn = false;
    // console.log('grayOn');
    clearIconStyle();
    document.getElementById('grayscaleImg').style.filter='invert(100%)';
    // document.getElementById('grayscaleImg').style.filter='invert(0%)';
    
}