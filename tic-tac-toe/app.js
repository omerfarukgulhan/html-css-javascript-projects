const winner = document.querySelector("#playerText");
const restartButton = document.querySelector("#restartBtn");
const boxes = document.querySelectorAll(".box");

const oSymbol = "O";
const xSymbol = "X";
let currentPlayer = xSymbol;
let spaces = Array(9).fill(null);

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

eventListener();

function eventListener() {
  boxes.forEach((box) => {
    box.addEventListener("click", boxClicked);
  });
  restartButton.addEventListener("click", restart);
}

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (playerHasWon() !== false) {
      winner.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map((box) => (boxes[box].style.backgroundColor = "#2d414b"));
      return;
    }
    currentPlayer = currentPlayer == xSymbol ? oSymbol : xSymbol;
  }
}

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      boxes.forEach((box) => {
        // For preeventing placing X/O after game done we have to remove eventlistener.
        box.removeEventListener("click", boxClicked);
      });
      return [a, b, c];
    }
  }
  return false;
}

function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  winner.innerHTML = "Tic Tac Toe";
  currentPlayer = xSymbol;
  boxes.forEach((box) => {
    // After game is done we must add it again in order to play it.
    box.addEventListener("click", boxClicked);
  });
}
