import { easyBot } from './easybot.mjs'
import {mediumBot} from './medium.mjs'


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
let winningCombo = []


//create a list with all square elements 
const inps = document.querySelectorAll('.ins'); 

const resetButton = document.querySelector('.resetButton')

resetButton.addEventListener('click', resetAll)

const continueButton = document.querySelector('.nextButton')

continueButton.addEventListener('click', resetGame)


const DEFAULT_PLAYER_MARK = 'X'
//add an event listener for every square
inps.forEach( (inp) =>  { 
    inp.addEventListener('click', handlePlayerChoice)
    
    }
    );





//themes, themes of site should change based on gamemode:
 /*


function setHawkTheme(){

}
function setDucklingTheme(){

}

function setPassPlayTheme(){
    
}
*/



function handlePlayerChoice(){
    if (gameMode=="passPlay"){
        player2 = "O"
        marks = new Set([player1, player2])
        squareIsPressed(this)}
    else if(gameMode=="easy"){
        player2Name = "Duckling"
    player2 = "🦆"
    marks = new Set([player1, player2])
    currentMark = player1
   
    squareIsPressedBot(this)
}
else{
    player2Name = "THE EAGLE"
player2= "🦅"
marks = new Set([player1, player2])
currentMark = player1
    squareIsPressedBot(this)
}

}

//after a player and bot plays a tile it should be disabled so player cant click on it
function disableTile(tile){
    console.log(`Tile Disabled ${tile}`)
    tile.removeEventListener('click', handlePlayerChoice)
}

//enable all the tiles again
function enableAllTiles(){
    inps.forEach( (inp) =>  { 
    inp.addEventListener('click', handlePlayerChoice)
    
    }
    );}

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

function resetTileColor(){
    inps.forEach(inp => {
        inp.style.backgroundColor = "#021c24"
        inp.style.border = "2px solid #96d6e9"
        
    })
}

function resetAll(){
    resetGame()
    player1Score = 0 
    player2Score = 0 
    tieScore = 0 
    player1ScoreBoard.innerHTML = `${player1Score}`
    player2ScoreBoard.innerHTML = `${player2Score}`
    tieScoreBoard.innerHTML = `${tieScore}`
    currentMark = player1
    updateTurnIndicator()

}
function resetGame(){
    winner = ""
    gameTie = false 
    gameOver = false 
    updateValues(true)
    enableAllTiles()
    resetTileColor()
    updateTurnIndicator()
    continueButton.style.visibility = "hidden"
    winningCombo = []



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



function winningComboAnimation(){
    inps.forEach((inp =>{
        if(winningCombo.includes(inp.getAttribute('data-value' ))){
            inp.style.backgroundColor = "Silver"
            inp.style.border = "2px solid #f5fd5f"
        }
    }))


}


function handleGameOver(){
    continueButton.style.visibility = "visible" //turn on continue button 
    winningComboAnimation()
    inps.forEach(inp => {disableTile(inp)})


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
        handleGameOver()
        return true

    }
    else if(gameOver && gameTie){
        gameisTie()
        awardPoint()
        handleGameOver()
        return true

    }

}
const player1ScoreTile = document.querySelector('.player1')
const player2ScoreTile = document.querySelector('.player2')

function styleTile(tile){
    if(currentMark == player1){
        tile.style.color = window.getComputedStyle(player1ScoreTile).backgroundColor
    }
    else if(currentMark == player2){
       tile.style.color =  window.getComputedStyle(player2ScoreTile).backgroundColor
        
    }

}

//function called every time an available square is pressed 
function squareIsPressed(tile){
    tile.innerHTML = currentMark; 
    styleTile(tile)
    disableTile(tile) 
    updateValues(); 
    changeMark(); 
    updateTurnIndicator(); 
    checkGameOver()
}

let botEasy = new easyBot(tiles)
let botImpossible = new mediumBot(tiles, player1, player2)

function botPlay(easy = false, impossible = false){
    if(easy){
        botEasy.getCurrentBoard(tiles)
        botEasy.setAvailableSquares()
        let choice = botEasy.getChoice()
        document.querySelector(`[data-value=${choice}]`).innerHTML = player2
        disableTile(document.querySelector(`[data-value=${choice}]`))

    }
    if(impossible){
       let move = botImpossible.getMove(tiles)
        document.querySelector(`[data-value=${move}]`).innerHTML = player2
        disableTile(document.querySelector(`[data-value=${move}]`))

    }

}

function squareIsPressedBot(tile){
    tile.innerHTML = currentMark;
    styleTile(tile)
    disableTile(tile)
    
     //same as square is pressed function, except bot must act other player, this will be done by play the bot turn after the player turn and after cheking all win conditions. 
    updateValues(); 
    
    if(checkGameOver()){return}

    else if(gameMode == "easy"){
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


let marks = new Set([player1, player2])


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
         winner = whoWon(tiles.square1)
        winningCombo = ['square1', 'square2', 'square3'] 
    }
    else if ((tiles['square1'] == tiles['square4']) && (tiles['square7'] == tiles['square4'])  && marks.has(tiles['square1'])){
         winner = whoWon(tiles.square1)
         winningCombo = ['square1', 'square4', 'square7'] 
        
    }
    
    else if ((tiles['square2'] == tiles['square5']) && (tiles['square5'] == tiles['square8']) && marks.has(tiles['square2'])){
         winner = whoWon(tiles.square2);
         winningCombo = ['square5', 'square2', 'square8']
        
    }

    else if ((tiles['square3'] == tiles['square6']) && (tiles['square6'] == tiles['square9']) && marks.has(tiles['square3'])){
         winner = whoWon(tiles.square3); 
         winningCombo = ['square9', 'square6', 'square3']
        
    }

    else if ((tiles['square4'] == tiles['square5']) && (tiles['square5'] == tiles['square6']) && marks.has(tiles['square4'])){
         winner = whoWon(tiles.square4)
         winningCombo = ['square4', 'square5', 'square6']
        
    }

    else if ((tiles['square7'] == tiles['square8']) && (tiles['square8'] == tiles['square9']) && marks.has(tiles['square7'])){
         winner = whoWon(tiles.square7); 
         winningCombo = ['square7', 'square8', 'square9']
        
    }

    else if ((tiles['square1'] == tiles['square5']) && (tiles['square5'] == tiles['square9']) && marks.has(tiles['square1'])) {
         winner = whoWon(tiles.square1); 
         winningCombo = ['square1', 'square5', 'square9']
        
    }

    else if ((tiles['square3'] == tiles['square5']) && (tiles['square5'] == tiles['square7']) && marks.has(tiles['square3'])){
         winner = whoWon(tiles.square3); 
         winningCombo = ['square5', 'square7', 'square3']
        
    }
    else {
        return
    }
}