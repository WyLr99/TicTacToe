let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
  window.location.reload();
  console.log("reset");
});
let cells = document.querySelectorAll(".cell");
let statusOfPlay = document.querySelector(".status");
let isDraw = false;
let isWinner = false;
let playerTurn = Math.floor(Math.random() * 2) + 1;
let move = "";
playerTurn == 1 ? statusOfPlay.innerHTML = "X's turn" : statusOfPlay.innerHTML = "O's turn"
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && !isDraw && !isWinner) {
      if (playerTurn == 1) {
        playMove("x");
        cell.textContent = move;
        checkWinner();
        if (!isWinner) {
          playerTurn = 2;
          statusOfPlay.innerHTML = "O's turn"
          checkDraw();
        }
      } else {
        playMove("o");
        cell.textContent = move;
        checkWinner();
        if (!isWinner) {
          playerTurn = 1;
          statusOfPlay.innerHTML = "X's turn"
          checkDraw();
        }
      }
    }
  });
});
function playMove(choice) {
  if (choice == "x") move = "X";
  else move = "O";
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
  let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winCombinations.forEach((combo) => {
    if (
      cells[combo[0]].textContent &&
      cells[combo[0]].textContent === cells[combo[1]].textContent &&
      cells[combo[1]].textContent === cells[combo[2]].textContent
    ) {
      for (let i = 0; i < 3; i++) {
        cells[combo[i]].style.backgroundColor = "lightgreen";
      }
      if (cells[combo[0]].textContent === "X") {
        statusOfPlay.innerHTML = "X Wins!";
        isWinner = true;
        return;
      } else if (cells[combo[0]].textContent === "O") {
        statusOfPlay.innerHTML = "O Wins!";
        isWinner = true;
        return;
      }
    }
  });
}
