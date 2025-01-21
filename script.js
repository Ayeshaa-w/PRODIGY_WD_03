const boardElement = document.getElementById('board');
const winnerElement = document.getElementById('winner');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'x';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            winnerElement.textContent = `Player ${board[a].toUpperCase()} wins!`;
            triggerConfetti();  // Trigger confetti when there's a winner
            return;
        }
    }
    if (!board.includes('')) {
        gameActive = false;
        winnerElement.textContent = 'It\'s a draw!';
    }
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    const cell = document.getElementById(`cell-${index}`);
    cell.textContent = currentPlayer.toUpperCase();
    cell.classList.add(currentPlayer);

    checkWinner();

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.id = `cell-${index}`;
        cell.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cell);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    gameActive = true;
    winnerElement.textContent = '';
    renderBoard();
}

resetButton.addEventListener('click', resetGame);

renderBoard();

// Function to trigger confetti
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
