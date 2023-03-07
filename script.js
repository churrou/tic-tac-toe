const Player = (name, token) => {
    return {name, token}
}

const Gameboard = (() => {
    const boardDiv = document.querySelector('.gameBoard')
    const board = document.querySelectorAll('.gamePiece')

    const resetBoard = () => {
        board.forEach(square => square.textContent = '')
    }

    const turnBoardActive = () => {
        board.forEach(square => square.classList.add('activeGamePiece'))
        boardDiv.classList.add('activeGameBoard')
    }
    const turnBoardInactive = () => {
        board.forEach(square => square.classList.remove('activeGamePiece'))
        boardDiv.classList.remove('activeGameBoard')
    }

    board.forEach(square => square.addEventListener('click', (event) => {
        Game.addToken(event)
    }));
    const getBoard = ()=> board

    return{getBoard, resetBoard, turnBoardActive, turnBoardInactive}
})();


const Game = (() => {
    const startBtn = document.querySelector('#start')
    const restartBtn = document.querySelector('#restart')
    const messageDisplay = document.querySelector('#messageDisplay')
    let boardArray = ["","","","","","","","",""];

    let players = [];
    let currentActivePlayer;
    let gameActive = false;
    
    const initPlayers = () => {
        let player1Name = document.querySelector('#player1').value
        let player2Name = document.querySelector('#player2').value
        players = [Player(player1Name, "X"), Player(player2Name, "O")]
        currentActivePlayer = players[0]
        messageDisplay.textContent = `${currentActivePlayer.name}'s turn`
    }

    const addToken = (square) => {
        const empty = (square) => square !== ''
        if (square.target.textContent !== '' || gameActive === false){
            messageDisplay.textContent = 'Press "Start Game" to Play'
            return
        }
        equalizeBoard(square)
        if (checkWin(boardArray)) {
            messageDisplay.textContent = `"${currentActivePlayer.token}" ${currentActivePlayer.name} wins!`
        }else if (boardArray.every(empty)){
            messageDisplay.textContent = `It's a tie!`
            gameActive = false
        }
        switchActivePlayer()
    }

    const checkWin = (board) => {
            const winConditions = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6],
            ]
            for (let i = 0; i < winConditions.length; i++){
                let [a, b, c] = winConditions[i];
                if (board[a] && board[a] === board[b] && board[a] === board[c]){
                    gameActive = false;
                    return true
                }
            }
            return false
        }

    const equalizeBoard = (event) => {
        event.target.textContent = currentActivePlayer.token
        boardArray[event.target.dataset.index] = event.target.textContent
    }

    const resetGame = () => {
        Gameboard.turnBoardInactive()  
        boardArray = ["","","","","","","","",""];
        messageDisplay.textContent = 'Enter Names to Play!'
        Gameboard.resetBoard()
        gameActive = false
    }

    const switchActivePlayer = () => {
        if (gameActive){
            currentActivePlayer = currentActivePlayer === players[0] ? players[1] : players[0]
            messageDisplay.textContent = `${currentActivePlayer.name}'s Turn`
        }
    }
    
    startBtn.addEventListener('click', ()=> {
        if (gameActive === false){
            resetGame()
            initPlayers()
            Gameboard.turnBoardActive()         
            gameActive = true
        }else{
            messageDisplay.textContent = 'A game is already in play'
        }
    })
    restartBtn.addEventListener('click', resetGame)

    const getBoardArray = () => boardArray

    return {addToken, getBoardArray}
})();
