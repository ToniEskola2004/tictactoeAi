const gameContainer = document.getElementById("gameContainer");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const cells = gameContainer.querySelectorAll(".cell");
let scoreval1 = 0;
let scoreval2 = 0;
let turn = "x";
let boardstatus = ["", "", "", "", "", "", "", "", ""];
let gameRunning = true;
const winConditions = [ [0, 1, 2], 
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [2, 4, 6] ];

cells.forEach((cell) => cell.addEventListener("click", cellClicked));
function changeTurn() {
    turn === "x" ? turn = "o" : turn = "x";
} 
function uppdateBoard() {
    score1.textContent = `X = ${scoreval1}`;
    score2.textContent = `O = ${scoreval2}`;
    cells.forEach((cell) => cell.textContent = "");
    boardstatus = ["", "", "", "", "", "", "", "", ""];
}
function reset() {
    scoreval1 = 0;
    scoreval2 = 0;
    uppdateBoard()
    gameRunning = true;
}
function checkWinner() {
    for(i = 0; i < winConditions.length; i++) {
        let int = winConditions[i];
        const [var1, var2, var3] = int;
        const contains = [boardstatus[var1], boardstatus[var2], boardstatus[var3]].every(elem => elem === turn);

        if (contains) {
            gameRunning = false;
            turn === "x" ? scoreval1++ : scoreval2++;
        }
    }
}
function cellClicked(event) {
    const cell = event.target;
    if (cell.innerText === "" && gameRunning) {
            const cellIndex = cell.dataset.index;
            cell.textContent = turn;
            boardstatus[cellIndex] = turn;
            checkWinner();
            changeTurn();
    }
}
function restart() { 
    gameRunning = true;
    uppdateBoard()
}