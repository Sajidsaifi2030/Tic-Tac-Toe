const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const scoreDrawText = document.getElementById("scoreDraw");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        const index = Number(cell.dataset.index);

        if (!gameActive || board[index] !== "") {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();
    });
});

function checkWinner() {
    let winningCombination = null;

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winningCombination = combination;
            break;
        }
    }

    if (winningCombination) {
        gameActive = false;

        winningCombination.forEach((index) => {
            cells[index].classList.add("winner");
        });

        statusText.textContent =
            "🎉 Player " + currentPlayer + " Wins!";

        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }

        cells.forEach((cell) => {
            cell.disabled = true;
        });

        return;
    }

    if (board.every((cell) => cell !== "")) {
        gameActive = false;
        statusText.textContent = "🤝 It's a Draw!";

        scoreDraw++;
        scoreDrawText.textContent = scoreDraw;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    statusText.textContent = "Player X's Turn";
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;

    scoreXText.textContent = "0";
    scoreOText.textContent = "0";
    scoreDrawText.textContent = "0";

    restartGame();
}

restartBtn.addEventListener("click", restartGame);
resetBtn.addEventListener("click", resetScores);