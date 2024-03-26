const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;
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

function showCongrats() {
  info.textContent = `${turn} wins!`;
  gameBoard.removeEventListener("click", handleGameBoardClick);
  gameBoard.setAttribute("inert", true);
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    emojis: ["🥳", "🎉", "🎊"],
  });
  setTimeout(restartGame, 1000);
}

function restartGame() {
  let seconds = 3;
  const timer = setInterval(() => {
    info.textContent = `Restarting in ${seconds}...`;
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      createGameBoard();
    }
  }, 1000);
}

function updateTurn() {
  turn = turn === "X" ? "O" : "X";
  info.textContent = `${turn}'s turn`;
  document.documentElement.style.setProperty("--hue", turn === "X" ? 10 : 200);
}

function createGameBoard() {
  const emptyTiles = " ".repeat(9).split("");
  const tileGrid = emptyTiles
    .map((t) => `<button class="tile"></button>`)
    .join("");
  gameBoard.innerHTML = tileGrid;
  turn = "X";
  document.documentElement.style.setProperty("--hue", 10);
  info.textContent = `${turn}'s turn`;
  gameBoard.addEventListener("click", handleGameBoardClick);
  const allTiles = gameBoard.querySelectorAll(".tile");
  allTiles.forEach((t) => {
    t.addEventListener("mouseenter", handleMouseEnter);
    t.addEventListener("mouseleave", handleMouseLeave);
  });
  gameBoard.removeAttribute("inert");
}

createGameBoard();

function checkScore() {
  const allTiles = [...document.querySelectorAll(".tile")];
  const tileValues = allTiles.map((t) => t.dataset.value);
  const isWinner = winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      tileValues[a] &&
      tileValues[a] === tileValues[b] &&
      tileValues[a] === tileValues[c]
    );
  });
  const isTie = allTiles.every((t) => t.dataset.value);
  if (isWinner) {
    return showCongrats();
  } else if (isTie) {
    info.textContent = "It's a tie!";
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["😞"],
    });
    setTimeout(restartGame, 1000);
  } else {
    updateTurn();
  }
}

function handleGameBoardClick(e) {
  const valueExists = e.target.dataset.value;
  if (!valueExists) {
    e.target.dataset.value = turn;
    e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
    checkScore();
  }
}

function handleMouseEnter(e) {
  const valueExists = e.target.dataset.value;
  if (!valueExists) {
    e.target.dataset.hover = turn;
    e.target.style.setProperty("--hue", turn === "X" ? 10 : 200);
  }
}

function handleMouseLeave(e) {
  e.target.dataset.hover = "";
}
