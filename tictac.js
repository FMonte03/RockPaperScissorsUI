import { easyBot } from './easybot.js'


let player1 = 'X'
let player2 = 'O'          
let player1Name = 'Filippo'
let player2Name = 'not Filippo'
let winner = "" 
let player1Score = 0 
let player2Score = 0 
let tieScore = 0 
let gameTie = false
let gameOver = false 
let currentMark = player1
let gameMode = "passPlay"


//create a list with all square elements 
const inps = document.querySelectorAll('.ins'); 

const DEFAULT_PLAYER_MARK = 'X'
//add an event listener for every square
inps.forEach( (inp) =>  { 
    inp.addEventListener('click', () => {
        if (gameMode=="passPlay"){squareIsPressed(inp)}
        else if(gameMode=="easy"){squareIsPressedBot(inp)
        player2Name = "Duckling"
        player2 = "🦆"
    }
    else{squareIsPressedBot(inp)
    player2Name = "THE EAGLE"
    player2= "🦅"}
    }
    );
} 
); 


//themes, themes of site should change based on gamemode: 
function setHawkTheme(){

}
function setDucklingTheme(){

}

function setPassPlayTheme(){
    
}



const selectMenu = document.querySelector('#gameMode')

selectMenu.addEventListener("change", () => {
    gameModeSelected(selectMenu)
    
}



)

function gameModeSelected(menu){//if called gamemode has been changed, meaning everything must be reset and we must get value of the game mode
    gameMode = menu.value 
    resetAll()
}


const player1ScoreBoard = document.querySelector('.player1Score')
const player2ScoreBoard = document.querySelector('.player2Score')
const tieScoreBoard = document.querySelector('.tieScore')

function awardPoint(winner){
    if(gameTie){
        tieScore += 1 
        tieScoreBoard.innerHTML = `${tieScore}`

    }
    else if(player1Name == winner){
        player1Score += 1 
        player1ScoreBoard.innerHTML = `${player1Score}`

    }
    else{
        player2Score += 1 
        player2ScoreBoard.innerHTML = `${player2Score}`
    }

} 

function resetAll(){
    resetGame()
   
    player1Score = 0 
    player2Score = 0 
    tieScore = 0 
    player1ScoreBoard.innerHTML = `${player1Score}`
    player2ScoreBoard.innerHTML = `${player2Score}`
    tieScoreBoard.innerHTML = `${tieScore}`

}
function resetGame(){
    winner = ""
    gameTie = false 
    gameOver = false 
    updateValues(true)


}


const tiles = {}
// update value of every square every turn to help checkWin functino
updateValues(); 

function updateValues(reset){// if reset = true then this function has been called from reset function and will erase the div values and the board values. 
    if(!reset){
    for(let i = 0; i < inps.length; i++){
        tiles[inps[i].getAttribute('data-value')] = inps[i].innerHTML; 
    }
    
    
    }
    else {
        for(let i = 0; i < inps.length; i++){
            tiles[inps[i].getAttribute('data-value')] = ""; 
            
        } 
        inps.forEach( (inp) =>  { 
            inp.innerHTML = "" 
    })
    
}
}






function changeMark() {
    if (currentMark == player1 ){
        currentMark = player2
    }
    else {currentMark = player1 }

}




function gameisTie(){
    turnIndicator.innerHTML = `Game is a Tie!`
}

function playerWins(){
    turnIndicator.innerHTML = `${winner} Wins!`
}

function checkGameOver(){
    checkWin(); 
    checkTie()
    if (gameOver && !gameTie){
        playerWins()
        awardPoint(winner)
        resetGame()

    }
    else if(gameOver && gameTie){
        gameisTie()
        awardPoint()
        resetGame()

    }

}

//function called every time an available square is pressed 
function squareIsPressed(tile){
    tile.innerHTML = currentMark; 
   // disableTile(tile) 
    updateValues(); 
    changeMark(); 
    updateTurnIndicator(); 
    checkGameOver()
}

let botEasy = new easyBot(tiles)

function botPlay(easy = false, impossible = false){
    if(easy){
        botEasy.getCurrentBoard(tiles)
        botEasy.setAvailableSquares()
        let choice = botEasy.getChoice()
        document.querySelector(`[data-value=${choice}]`).innerHTML = player2

    }

}

function squareIsPressedBot(tile){
    tile.innerHTML = player1;
     //same as square is pressed function, except bot must act other player, this will be done by play the bot turn after the player turn and after cheking all win conditions. 
    updateValues(); 
    checkGameOver()
    if(gameOver){return}

    if(gameMode == "easy"){
        botPlay(true, false)  
    }  //if game over, bot will play first next game, instead of player, if game not over it will just play the next turn. 
    else if(gameMode == "impossible"){
        botPlay(false, true)
    }
    updateValues()
    checkGameOver()
    
}


//function disableTile(){}

const turnIndicator = document.querySelector('#turnIndicator')

function updateTurnIndicator(){



if(gameOver == true){turnIndicator.innerHTML = "Game Over!"} 


else if(currentMark == player1){
    turnIndicator.innerHTML = `Player ${player1} Turn`
}

else{turnIndicator.innerHTML = `Player ${player2} Turn`}



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

    gameOver = true
    if (mark == player1){
        return player1Name
    }

    
    return player2Name
} 


//if all squares have values and game != over, return tie = true 
// if game is tie 
function checkTie(){

    let filled = true //check if all tiles are filled

    for (let key in tiles){
        if(tiles[key] == ""){
            filled = false
        }
    }

   
    if(filled){
        gameOver = true
    }

    if(gameOver && winner == ""){
        gameTie = true 
    }
    
    
    return 
}


function checkWin(){

    if ((tiles['square1'] == tiles['square2']) && (tiles['square3'] == tiles['square2'])  && marks.has(tiles['square1'])){
         winner = whoWon(tiles.square1); 
    }
    else if ((tiles['square1'] == tiles['square4']) && (tiles['square7'] == tiles['square4'])  && marks.has(tiles['square1'])){
         winner = whoWon(tiles.square1); 
        
    }
    
    else if ((tiles['square2'] == tiles['square5']) && (tiles['square5'] == tiles['square8']) && marks.has(tiles['square2'])){
         winner = whoWon(tiles.square2); 
        
    }

    else if ((tiles['square3'] == tiles['square6']) && (tiles['square6'] == tiles['square9']) && marks.has(tiles['square3'])){
         winner = whoWon(tiles.square3); 
        
    }

    else if ((tiles['square4'] == tiles['square5']) && (tiles['square5'] == tiles['square6']) && marks.has(tiles['square4'])){
         winner = whoWon(tiles.square4); 
        
    }

    else if ((tiles['square7'] == tiles['square8']) && (tiles['square8'] == tiles['square9']) && marks.has(tiles['square7'])){
         winner = whoWon(tiles.square7); 
        
    }

    else if ((tiles['square1'] == tiles['square5']) && (tiles['square5'] == tiles['square9']) && marks.has(tiles['square1'])) {
         winner = whoWon(tiles.square1); 
        
    }

    else if ((tiles['square3'] == tiles['square5']) && (tiles['square5'] == tiles['square7']) && marks.has(tiles['square3'])){
         winner = whoWon(tiles.square3); 
        
    }
    else {
        return
    }
}