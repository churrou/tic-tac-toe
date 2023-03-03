const gameBoard = [
    '1', '2', '3', 
    '4', '5', '6', 
    '7', '8', '9'
]

const player1 = 'O'
const player2 = 'X'
let turn = 1

const square1 = document.querySelector(".gameBoard")

function checkTurn(){
    let currentPlayer = player1;
    if (turn !== 1){
        currentPlayer = player2;
        turn--
        return currentPlayer
    }
    turn++
    return currentPlayer
}

checkTurn

function createGrid() {
    for (let i = 0; i < gameBoard.length; i++){
        const squares = document.createElement('div')
        squares.addEventListener('click', ()=>{
            squares.textContent = checkTurn()
        })
        squares.classList.add('gamePiece')
        squares.textContent = gameBoard[i]
        square1.append(squares)
    }
}
createGrid();
