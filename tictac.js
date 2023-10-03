
let player1 = 'X'
let player2 = 'O'
let player1Name = 'Filippo'
let player2Name = 'not FIlippo'
//create a list with all square elements 
const inps = document.querySelectorAll('.ins'); 

const DEFAULT_PLAYER_MARK = 'X'
//add an event listener for every square
inps.forEach( (inp) =>  { 
    inp.addEventListener('click', () => {
        squareIsPressed(inp)
    }
    );
} 
); 


let currentMark = player1





const tiles = {}
// update value of every square every turn to help checkWin functino
updateValues(); 
function updateValues(){
    for(let i = 0; i < inps.length; i++){
        tiles[inps[i].getAttribute('data-value')] = inps[i].innerHTML; 
    
    
    }
    console.log(tiles)
}


let gameOver = false 


function changeMark() {
    if (currentMark == player1 ){
        currentMark = player2
    }
    else (currentMark = player1 )

}





//function called every time an available square is pressed 
function squareIsPressed(tile){
    tile.innerHTML = currentMark; 
    updateValues(); 
    checkWin(); 
    changeMark(); 
    updateTurnIndicator(); 
}

const turnIndicator = document.querySelector('.turnIndicator')

function updateTurnIndicator(){



if(gameOver == true){} 


else if(currentMark == player1){
    turnIndicator.innerHTML = `${player1} Turn`
}




}


const marks = new Set([player1, player2])


console.log(tiles)
/* 
function that checks win after every turn. 

square1|square2|square3
square4|square5|square6
square7|square8|square9




*/
//check who won the game by seeing if the mark of the first player == winning mark. 
function whoWon(mark){
if (mark == player1){
    return player1Name
}


return player2Name
} 




function checkWin(){

    if ((tiles['square1'] == tiles['square2']) && (tiles['square3'] == tiles['square2'])  && marks.has(tiles['square1'])){
        let winner = whoWon(tiles.square1); 
    }
    else if ((tiles['square1'] == tiles['square4']) && (tiles['square7'] == tiles['square4'])  && marks.has(tiles['square1'])){
        let winner = whoWon(tiles.square1); 
        
    }
    
    else if ((tiles['square2'] == tiles['square5']) && (tiles['square5'] == tiles['square8']) && marks.has(tiles['square2'])){
        let winner = whoWon(tiles.square2); 
        
    }

    else if ((tiles['square3'] == tiles['square6']) && (tiles['square6'] == tiles['square9']) && marks.has(tiles['square3'])){
        let winner = whoWon(tiles.square3); 
        
    }

    else if ((tiles['square4'] == tiles['square5']) && (tiles['square5'] == tiles['square6']) && marks.has(tiles['square4'])){
        let winner = whoWon(tiles.square4); 
        
    }

    else if ((tiles['square7'] == tiles['square8']) && (tiles['square8'] == tiles['square9']) && marks.has(tiles['square7'])){
        let winner = whoWon(tiles.square7); 
        
    }

    else if ((tiles['square1'] == tiles['square5']) && (tiles['square5'] == tiles['square9']) && marks.has(tiles['square1'])) {
        let winner = whoWon(tiles.square1); 
        
    }

    else if ((tiles['square3'] == tiles['square5']) && (tiles['square5'] == tiles['square7']) && marks.has(tiles['square3'])){
        let winner = whoWon(tiles.square3); 
        
    }
    else {
        return
    }
}