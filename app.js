// Initialize the game board- this is a potential problem right now.
//get all cell elements
// const cells = document.querySelectorAll('.cell');

// cells.forEach((cell, index) => {
//   cell.addEventListener('click', () => handleCellClick(index));
// });

const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  
  // Define the players
  const player = "X";
  const computer = "O";
  
  // Function to check if a player has won
  function checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
  
// Check columns
for (let i = 0; i < 3; i++) {
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
    return true;
    }
}

// Check diagonals
if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
}
if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
}

return false;
}
  
// Function to check if the board is full
function isBoardFull() {
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
    if (board[i][j] === "") {
        return false;
    }
    }
}
return true;
}
  
// Function to get the best move for the computer
function getBestMove() {
// Check if the computer can win
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
    if (board[i][j] === "") {
        board[i][j] = computer;
        if (checkWin(computer)) {
        return [i, j];
        }
        board[i][j] = "";
    }
    }
}
  
// Check if the player can win and block them
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
    if (board[i][j] === "") {
        board[i][j] = player;
        if (checkWin(player)) {
        board[i][j] = computer;
        return [i, j];
        }
        board[i][j] = "";
    }
    }
}
  
// Choose a random move
let move;
do {
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);
    if (board[row][col] === "") {
    move = [row, col];
    }
} while (!move);
return move;
}
  
// Function to make a move
function makeMove(row, col, player) {
board[row][col] = player;
}

// Function to play the game
function playGame() {
let playerTurn = true;

// Game loop
while (true) {
    if (playerTurn) {
    // Get the player's move
    const [row, col] = getBestMove();
    makeMove(row, col, player);
    if (checkWin(player)) {
        console.log("You win!");
        break;
    }
    } else {
    // Get the computer's move- can I just write this as makeComputerMove?
    const [row, col] = getBestMove();
    makeMove(row, col, computer);
    if (checkWin(computer)) {
        console.log("Computer wins!");
        break;
    }
    }

    if (isBoardFull()) {
    console.log("It's a tie!");
    break;
    }

    playerTurn = !playerTurn;
}
}

// Cell gets clicked- then what?
function handleCellClick(index) {
    const row = Math.floor(index/3);
    const col = index % 3;
    console.log(`player has attempted to click ${row, col}!`)
    if (board[row][col] === "") {
        makeMove(row, col, player);
        cells[index].textContent = player;

        if(checkWin(player)) {
            alert("You Win!");
        } else if (isBoardFull()) {
            alert("The Game is a Draw :/");
        } else {
            makeComputerMove();
        }
    }
}

function makeComputerMove() {
    const [row, col] = getBestMove();
    makeMove(row,col, computer);

    const cellIndex = row * 3 + col;

    cells[cellIndex].textContent = computer;

    if (checkWin(computer)) {
        alert("The Machines Have Won. Prepare Yourself.");
    } else if (isBoardFull()) {
        alert("The Game is a Draw :/");
    }
}
  
  // Start the game
  playGame();