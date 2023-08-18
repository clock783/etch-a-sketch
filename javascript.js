
//define global variables
const mainBoardWidth = 600; //desired width in pixels
const mainBoardHeight = 600; //desired height in pixels
let gridSize = document.getElementById('gridSize').value; //number of rows & columns to build grid. quantity will be the same in both directions.
let isMouseDown = false;
document.addEventListener('mousedown',()=>{isMouseDown=true});
document.addEventListener('mouseup', ()=>{isMouseDown=false});

//intialize board
generateGrid(gridSize);
changeColor();


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
    changeColor();
})

function changeColor(){
    let cells = document.getElementsByClassName('cells');
    // console.log('here');
    Array.from(cells).forEach(element =>{
        element.addEventListener('mouseover',()=>{
            if(isMouseDown){
                element.style.backgroundColor = 'black';
            }
        })
    });
    // return cells;
}