
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Håndter klik på spillefelterne
cells.forEach(cell => {
    cell.addEventListener("click", () => {

        // Stop hvis feltet er optaget eller spillet er slut
        if (cell.textContent !== "" || !gameActive) {
            return;
        }

        // Sæt X eller O i feltet
        cell.textContent = currentPlayer;

        // Kontroller om spilleren har vundet
        if (checkWinner()) {
            return;
        }

        // Kontroller om spillet er uafgjort
        if (checkDraw()) {
            return;
        }

        // Skift mellem X og O
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        statusText.textContent = `Player ${currentPlayer}'s turn`;
    });
});

// Kontroller om der er en vinder
function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return true;
        }
    }

    return false;
}

// Kontroller om spillet er uafgjort
function checkDraw() {
    const allFilled = [...cells].every(cell => cell.textContent !== "");

    if (allFilled) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return true;
    }

    return false;
}

// Genstart spillet
restartButton.addEventListener("click", () => {

    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's turn";
});
