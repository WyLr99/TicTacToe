let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
  startGame();
});
let cells = document.querySelectorAll(".cell");
let statusOfPlay = document.querySelector(".status");
var players = ["X", "O"];
var huplayer;
var computer;
var origBoard;
let isDraw = false;
let isWinner = false;
let rng = Math.floor(Math.random() * players.length);
let counter = 0;
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
startGame();
function startGame() {
  rng = Math.floor(Math.random() * players.length);
  huplayer = players[Math.floor(Math.random() * players.length)];
  computer = players[players.indexOf(huplayer) === 0 ? 1 : 0];
  isWinner = false;
  isDraw = false;
  origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
  if (rng === 0) {
    computerTurn();
  }
  statusOfPlay.innerHTML = "You are playing as " + huplayer;
}
function turnClick(square) {
  checkDraw();
  checkWinner();
  if (isDraw || isWinner || counter == 1) {
    return;
  }
  if (typeof origBoard[square.target.id] == "number") {
    turn(square.target.id, huplayer);
    counter = 1;
    checkDraw();
    setTimeout(() => {
      counter = 0;
      turn(bestSpot(), computer);
    }, 250);

    checkDraw();
  }
}
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  checkWinner();
}
function checkWhoWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombinations.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}
function emptySquares() {
  return origBoard.filter((s) => typeof s == "number");
}

function bestSpot() {
  return minimax(origBoard, computer).index;
}
function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);

  if (checkWhoWin(newBoard, huplayer)) {
    return { score: -10 };
  } else if (checkWhoWin(newBoard, computer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == computer) {
      var result = minimax(newBoard, huplayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, computer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === computer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function checkDraw() {
  let allFilled = true;
  cells.forEach((cell) => {
    if (cell.textContent === "") {
      allFilled = false;
    }
  });
  if (allFilled) {
    statusOfPlay.innerHTML = "It's a draw!";
    isDraw = true;
  }
}
function checkWinner() {
  winCombinations.forEach((combo) => {
    if (
      cells[combo[0]].textContent &&
      cells[combo[0]].textContent === cells[combo[1]].textContent &&
      cells[combo[1]].textContent === cells[combo[2]].textContent
    ) {
      for (let i = 0; i < 3; i++) {
        cells[combo[i]].style.backgroundColor = "lightgreen";
      }
      if (cells[combo[0]].textContent === huplayer) {
        statusOfPlay.innerHTML = "You win!";
        isWinner = true;
        return;
      } else if (cells[combo[0]].textContent === computer) {
        statusOfPlay.innerHTML = "Computer wins!";
        isWinner = true;
        return;
      }
    }
  });
}

function computerTurn() {
  let index = Math.floor(Math.random() * 9);
  if (typeof origBoard[index] == "number") {
    turn(index, computer);
  } else {
    computerTurn();
  }
}
