
//define global variables
const mainBoardWidth = 500; //desired width in pixels
const mainBoardHeight = 500; //desired height in pixels
let gridSize = 100; //number of rows & columns to build grid. quantity will be the same in both directions.

//define etch-a-sketch container width 
let mainBoardContainer = document.getElementById("mainBoard");
mainBoardContainer.style.minWidth = `${mainBoardWidth}px`;
mainBoardContainer.style.minHeight = `${mainBoardHeight}px`;
mainBoardContainer.style.maxWidth = `${mainBoardWidth}px`;
mainBoardContainer.style.maxHeight = `${mainBoardHeight}px`;


for (i=0; i<gridSize; i++){
    //create div corresponding to the row
    let rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.alignItems = "stretch";
    rowDiv.style.height = `${mainBoardHeight / gridSize}px`;
    // rowDiv.style.border = "1px solid red"//for debugging purposes

    for (j=0; j<gridSize; j++){
        //create div corresponding to columns within the row
        let div = document.createElement("div");
        div.style.width = `${mainBoardWidth / gridSize}px`;
        // div.style.height = `${mainBoardHeight / gridSize}px`;
        div.style.border = "0.5px solid rgb(200 200 200)";
        div.style.backgroundColor = "white";
        rowDiv.appendChild(div);
    }
    document.getElementById("mainBoard").appendChild(rowDiv);
}
