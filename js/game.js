class Game {
    constructor(playersIndicator) {
        this.player1 = "X";
        this.player2 = "O";
        this.gameContainer = document.getElementById("gameContainer");
        this.score1 = document.getElementById("score1");
        this.score2 = document.getElementById("score2");
        this.scoreval1 = 0;
        this.scoreval2 = 0;
        this.cells = this.gameContainer.querySelectorAll(".cell");
        this.cells.forEach((cell) => cell.addEventListener("click", (event) => this.cellClicked(event)));
        this.playersIndicator = playersIndicator;
        this.startingTurn = 1;
        this.turn = this.startingTurn;
        this.boardState = ["", "", "", "", "", "", "", "", ""];
        this.gameRunning = true;
        this.winConditions = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];
        
        if (playersIndicator !== this.startingTurn) {
            this.computerPlays()
        }
    }
    changeTurn() {
        this.turn === 1 ? this.turn = 0 : this.turn = 1;
    }
    isBoardFull(board) {
        if (!board.includes("")) return true;
        else return false;
    }
    StartGameState() {
        this.score1.textContent = `X = ${this.scoreval1}`;
        this.score2.textContent = `O = ${this.scoreval2}`;
        this.boardState = ["", "", "", "", "", "", "", "", ""];
        this.updateBoard();
        this.gameRunning = true;
        if (this.turn !== this.startingTurn) this.changeTurn();
        if (this.turn !== this.playersIndicator) this.computerPlays();
    }
    updateBoard() {
        this.cells.forEach((cell, i) => 
        this.boardState[i] === 1 ? cell.textContent = this.player1 : 
        this.boardState[i] === 0 ? cell.textContent = this.player2 : 
        cell.textContent = "");
    }
    reset() {
        this.scoreval1 = 0;
        this.scoreval2 = 0;
        this.StartGameState();
    }
    restart() {
        this.StartGameState();
    }
    checkWinner(boardState) {
        for (var i = 0; i < this.winConditions.length; i++) {
            const statusPerTile = this.winConditions[i].map((tile) => boardState[tile]);
            // if x or o and all values in array same because we don't want to check for empty
            if ([1, 0].includes(statusPerTile[0]) && statusPerTile.every(elem => elem === statusPerTile[0])) {
                return true;
            }
        }
        return false;
    }
    endOfTurn(player) {
        if (this.checkWinner(this.boardState)) {
            this.gameRunning = false;
            this.turn === 1 ? this.scoreval1++ : this.scoreval2++;
        }
        else if (this.isBoardFull(this.boardState)) {
            this.gameRunning = false;
        } else {
            this.changeTurn();
            if (player) this.computerPlays();
        }
        this.updateBoard();
    }
    cellClicked(event) {
        const cell = event.target;
        if (cell.innerText === "" && this.gameRunning && this.turn == this.playersIndicator) {
            const cellIndex = cell.dataset.index;
            cell.textContent = this.turn;
            this.boardState[cellIndex] = this.turn;
            this.endOfTurn(true)
        }
    }
    simulate(instance, turn, depth) {
        let bestScore = 0;
        let score = 0;
        if (this.checkWinner(instance)) {
            // inverted score given to players because checks for previously simulated actor           
            return turn === this.playersIndicator ? 8 - depth : depth - 8;
        }
        if (this.isBoardFull(instance)) return 0;
        if (turn !== this.playersIndicator) {
            bestScore = -Infinity;
            for (var i = 0; i < this.boardState.length; i++) {
                if (instance[i] === "") {
                    instance[i] = turn;
                    if (turn === 1) {
                        score = this.simulate(instance, 0, depth + 1);
                    } else {
                        score = this.simulate(instance, 1, depth + 1);
                    }
                    instance[i] = "";
                    if (score > bestScore) bestScore = score;
                }
            }
        } else {
            bestScore = +Infinity;
            for (var i = 0; i < this.boardState.length; i++) {
                if (instance[i] === "") {
                    instance[i] = turn;
                    if (turn === 1) {
                        score = this.simulate(instance, 0, depth + 1);
                    } else {
                        score = this.simulate(instance, 1, depth + 1);
                    }
                    instance[i] = "";
                    if (score < bestScore) bestScore = score;                   
                }
            }
        }

        return bestScore;
    }
    computerMove(board) {
        if (this.gameRunning && this.turn !== this.playersIndicator) {
            let scores = [];
            let bestScore = -Infinity;
            let bestMove = 0;
            for (var i = 0; i < this.boardState.length; i++) {
                if (board[i] === "") {
                    board[i] = this.turn;
                    let score = this.simulate(board, this.turn === 1 ? 0 : 1, 0);
                    board[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                    scores[i] = score;
                }
            }
            console.log(scores);
            return bestMove;
        }
    }
    computerPlays() {
        this.boardState[this.computerMove(this.boardState)] = this.turn;
        this.endOfTurn(false);
    }
}