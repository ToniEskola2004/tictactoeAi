class Game {
    constructor(playersIndicator) {
        this.gameContainer = document.getElementById("gameContainer");
        this.score1 = document.getElementById("score1");
        this.score2 = document.getElementById("score2");
        this.scoreval1 = 0;
        this.scoreval2 = 0;
        this.cells = this.gameContainer.querySelectorAll(".cell");
        this.cells.forEach((cell) => cell.addEventListener("click", (event) => this.cellClicked(event)));
        this.playersIndicator = playersIndicator;
        this.dominantTrun = "x";
        this.turn = this.dominantTrun;
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
        if (playersIndicator !== this.dominantTrun) {
            this.computerPlays()
        }
    }
    changeTurn() {
        this.turn === "x" ? this.turn = "o" : this.turn = "x";
    }
    isBoardFull(board) {
        if (!board.includes("")) return true;
        else return false;
    }
    clearGameState() {
        this.score1.textContent = `X = ${this.scoreval1}`;
        this.score2.textContent = `O = ${this.scoreval2}`;
        this.boardState = ["", "", "", "", "", "", "", "", ""];
        this.updateBoard();
    }
    updateBoard() {
        this.cells.forEach((cell, i) => cell.textContent = this.boardState[i]);
    }
    reset() {
        this.scoreval1, this.scoreval2 = 0;
        this.clearGameState();
        this.gameRunning = true;
        if (this.playersIndicator !== this.dominantTrun) {
            this.changeTurn();
            this.computerPlays()
        }
    }
    restart() {
        this.clearGameState();
        this.gameRunning = true;
        if (this.playersIndicator !== this.dominantTrun) {
            this.changeTurn();
            this.computerPlays()
        }
    }
    checkWinner(boardState) {
        for (var i = 0; i < this.winConditions.length; i++) {
            const statusPerTile = this.winConditions[i].map((tile) => boardState[tile]);
            if (["x", "o"].includes(statusPerTile[0]) && statusPerTile.every(elem => elem === statusPerTile[0])) {
                return true;
            }
        }
        return false;
    }
    endOfTurn(player) {
        if (this.checkWinner(this.boardState)) {
            this.gameRunning = false;
            this.turn === "x" ? this.scoreval1++ : this.scoreval2++;
        }
        else if (this.isBoardFull(this.boardState)) {
            this.gameRunning = false;
        } else {
            this.changeTurn();
            if (player) this.computerPlays(this.boardState);
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
        let score = 0;
        if (this.checkWinner(instance)) {
            return this.playersIndicator === turn ? 10 - depth : depth - 10;
        }
        if (this.isBoardFull(instance)) return 0;
        for (var i = 0; i < this.boardState.length; i++) {
            if (instance[i] === "") {
                instance[i] = turn;
                if (turn === "x") {
                    score += this.simulate(instance, "o", depth + 1);
                } else {
                    score += this.simulate(instance, "x", depth + 1);
                }
                instance[i] = "";
            }
        }
        return score
    }
    computerMove(board) {
        if (this.gameRunning && this.turn !== this.playersIndicator) {
            let bestScore = -Infinity;
            let bestMove = 0;
            for (var i = 0; i < this.boardState.length; i++) {
                if (board[i] === "") {
                    board[i] = this.turn;
                    let score = this.simulate(board, this.turn, 0);
                    board[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }
            return bestMove;
        }
    }
    computerPlays() {
        this.boardState[this.computerMove(this.boardState)] = this.turn;
        this.endOfTurn(false)
    }
}