export class impossibleBot{
    constructor(board, player, bot){//board is object dictionary
    
        this.board = board
        this.player = player
        this.bot = bot 
       
  
    }

    setAvailableSquares(board){
        let available = []
        for(let key in board){
            if(board[key] == ""){
                available.push(key)
            }
            
        }
        return available
    }

    getMove(board){
        this.board = board
        let move =  this.minMaxAlgo(this.board, this.bot);
        return move;

    }

    minMaxAlgo(reBoard, player){
        let available = this.setAvailableSquares(reBoard)
        
        if(this.checkWinner(this.player)){
            return {score : -1}
        }
        else if(this.checkWinner(this.bot)){
            return {score:1}
        }
        else if(this.available.length == 0){
            return{score:0}
        }


        let moves = []; 
        for(let i = 0; i < this.availableSquares.length; i++){
            let move = {}
            move.index = available[i];
            reBoard[available[i]] = player

            if(player == this.bot){
                let result = this.minMaxAlgo(reBoard, this.player)
                move.score = result.score
            }
            else {
                let result = this.minMaxAlgo(reBoard, this.bot)
                move.score = result.score

            }
            reBoard[available[i]] = ''
            moves.push(move)
        }
        let bestMove
        if (player == this.bot){
            let bestScore = -Infinity
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score> bestScore){
                    bestScore = moves[i].score
                    bestMove = i
                }
            }
            }
            else{
                let bestScore = Infinity;
                for (let i = 0; i < moves.length; i++) {
                  if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                  }
                }
              }
          
              return moves[bestMove];
            }
          
       
/* 
function that checks win after every turn. 

square1|square2|square3
square4|square5|square6
square7|square8|square9*/

    checkWinner(player){

        if (
            (this.board["square1"] == player && this.board["square2"] == player && this.board["square3"] == player) ||
            (this.board["square4"] == player && this.board["square5"] == player && this.board["square6"] == player) ||
            (this.board["square7"] == player && this.board["square8"] == player && this.board["square9"] == player) ||
            (this.board["square1"] == player && this.board["square4"] == player && this.board["square7"] == player) ||
            (this.board["square2"] == player && this.board["square5"] == player && this.board["square8"] == player) ||
            (this.board["square3"] == player && this.board["square6"] == player && this.board["square9"] == player) ||
            (this.board["square1"] == player && this.board["square5"] == player && this.board["square9"] == player) ||
            (this.board["square3"] == player && this.board["square5"] == player && this.board["square7"] == player) )
            {
            return true 
            }
            else {return false} 
    }
    

    



}