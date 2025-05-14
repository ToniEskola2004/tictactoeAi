class Game {
    constructor() {
        this.gameContainer = document.getElementById("gameContainer");
        this.score1 = document.getElementById("score1");
        this.score2 = document.getElementById("score2");
        this.cells = this.gameContainer.querySelectorAll(".cell");
        this.player = new Player();
        this.turn = "X";
        this.boardstatus = ["", "", "", "", "", "", "", "", ""];
        this.gameRunning = true;
        this.winConditions = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]];
    }

    changeTurn() {
        this.turn === "X" ? this.turn = "O" : this.turn = "X";
    }
    uppdateBoard() {
        this.score1.textContent = `X = ${this.scoreval1}`;
        this.score2.textContent = `O = ${this.scoreval2}`;
        this.cells.forEach((cell) => cell.textContent = "");
        this.boardstatus = ["", "", "", "", "", "", "", "", ""];
    }
    reset() {
        this.scoreval1 = 0;
        this.scoreval2 = 0;
        this.uppdateBoard();
        this.gameRunning = true;
    }
    checkWinner() {
        for (var i = 0; i < this.winConditions.length; i++) {
            const statusPerTile = this.winConditions[i].map((tile) => this.boardstatus[tile]);
            if (statusPerTile.every(elem => elem == this.turn)) {
                this.gameRunning = false;
                this.turn === "X" ? this.scoreval1++ : this.scoreval2++;
            }
        }
    }
    restart() {
        this.gameRunning = true;
        this.uppdateBoard();
    }
}