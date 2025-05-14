class Player extends Game {
    constructor() {
        // super();
        this.turn = 0;
        // this.boardstatus = super(this.boardstatus);
        // this.cells = super(this.cells);
        this.score = 0;
        this.cells.forEach((cell) => cell.addEventListener("click", (event) => this.cellClicked(event)));
    }
    cellClicked(event) {
        const cell = event.target;
        if (cell.innerText === "" && this.gameRunning) {
            const cellIndex = cell.dataset.index;
            cell.textContent = this.turn;
            this.boardstatus[cellIndex] = this.turn;
            this.checkWinner();
            this.changeTurn();
        }
    }
}