export class mediumBot{
    constructor(board, player, bot){// AI to follow Newell and Simon's strategy found on wikipedia
        /*
        Win: If the player has two in a row, they can place a third to get three in a row.
        Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
        Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
        Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to make two in a row. Otherwise, the player should make a two in a row to force the opponent into defending, as long as it does not result in them producing a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner move to win. (Playing a corner move in this scenario produces a fork for "X" to win.)
        Center: A player marks the center. (If it is the first move of the game, playing a corner move gives the second player more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
        Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
        Empty corner: The player plays in a corner square.
        Empty side: The player plays in a middle square on any of the four sides.


        */
    
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
        let move =  this.SnN(this.board);
        return move;

    }

    SnN(board){
        let bot = this.bot
        let player = this.player
        let available = this.setAvailableSquares(board)
        let r1 = "square1,square2,square3"
        r1 = r1.split(",")
        let r2 = "square4,square5,square6"
        r2 = r2.split(",")
        let r3 = "square7,square8,square9"
        r3 = r3.split(",")
        let c1 = "square1,square4,square7"
        c1 = c1.split(",")
        let c2 = "square2,square5,square8"
        c2 = c2.split(",")
        let c3 = "square3,square6,square9"
        c3 = c3.split(",")
        let a1 = "square1,square5,square9"
        a1 = a1.split(",")
        let a2 = "square3,square5,square7"
        a2 = a2.split(",")

        let result = null
        let combinations = [r1,r2,r3,c1,c2,c3,a1,a2] //loop through every combination, if there is a 2 in a row for bot and leftover is available, win. if 2 in a row for player, block.
        combinations.forEach(combination => {
            let p = 0 
            let b = 0 
            let e = ""

            for(let i = 0; i < combination.length; i++){
                if(board[combination[i]] == player){
                    p++
                }
                else if(board[combination[i]] == bot){
                    b++
                }
                else if(available.includes(combination[i])) {
                    e = combination[i]
                }


            }

            if(p == 2 && e !== ""){
                console.log("BLOCK")
                result = e     
            }
            else if(b == 2 && e !==""){
                console.log("Win")
                result = e 
            }
            if(result !== null){
                return 
            }
            
        });
        if(result != null){
            return result
        }
        if(available.includes("square5")){ //if center available mark center
            console.log("Center")
            return "square5"
        }

        let corners = ["square1", "square3", "square7", "square9"] //if corner available mark corner
        for(let i = 0; i < corners.length ; i++){
            if(available.includes(corners[i])){
                console.log("Corner")
                return corners[i];
            }
        }

        //if a combination is empty, mark the center of it
        combinations.forEach(combination => {
            if(combination.every(i => available.includes(i)) ){
                console.log("CombCenter")
                return combination[1];
            }


        })
        
    }
          
} 
/* 
function that checks win after every turn. 

square1|square2|square3
square4|square5|square6
square7|square8|square9*/

    
    
