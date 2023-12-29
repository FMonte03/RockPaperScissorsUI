//roles: get updated board, find available spaces, make a random choice. 

export class easyBot{
    constructor(board){//board is object dictionary
    
        this.board = board
        this.availableSquares = []
  
    }

    setAvailableSquares(){
        
        for(let key in this.board){
            if(this.board[key] == ""){
                this.availableSquares.push(key)
            }

        }

    }

    getCurrentBoard(board){//if getting the board then a turn has been played or first turn, meaning availables must be cleared
        this.board = board
        this.availableSquares = []
    }

    getChoice(){
        return this.availableSquares[Math.floor(Math.random() * this.availableSquares.length)]
    }



}