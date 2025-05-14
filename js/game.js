class game {
    #gameContainer = document.getElementById("gameContainer");
    #score1 = document.getElementById("score1");
    #score2 = document.getElementById("score2");
    #cells = gameContainer.querySelectorAll(".cell");
    #scoreval1 = 0;
    #scoreval2 = 0;
    #turn = "x";
    #boardstatus = ["", "", "", "", "", "", "", "", ""];
    #gameRunning = true;
    #winConditions = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

    // cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    #changeTurn() {
        turn === "x" ? turn = "o" : turn = "x";
    }
    #uppdateBoard() {
        this.#score1.textContent = `X = ${scoreval1}`;
        this.#score2.textContent = `O = ${scoreval2}`;
        cells.forEach((cell) => cell.textContent = "");
        boardstatus = ["", "", "", "", "", "", "", "", ""];
    }
    #reset() {
        scoreval1 = 0;
        scoreval2 = 0;
        uppdateBoard()
        gameRunning = true;
    }
    #checkWinner() {
        for (i = 0; i < winConditions.length; i++) {
            const statusPerTile = winConditions[i].map((tile) => boardstatus[tile]);
            if (statusPerTile.every(elem => elem == turn)) {
                gameRunning = false;
                turn === "x" ? scoreval1++ : scoreval2++;
            }
        }
    }
    #cellClicked(event) {
        const cell = event.target;
        if (cell.innerText === "" && gameRunning) {
            const cellIndex = cell.dataset.index;
            cell.textContent = turn;
            boardstatus[cellIndex] = turn;
            checkWinner();
            changeTurn();
        }
    }
    #restart() {
        gameRunning = true;
        uppdateBoard()
    }
}