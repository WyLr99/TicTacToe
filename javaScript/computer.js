let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
  window.location.reload();
  console.log("reset");
});
let cells = document.querySelectorAll(".cell");
let statusOfPlay = document.querySelector(".status");
let isDraw = false;
let isWinner = false;

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "" && !isDraw && !isWinner) {
        cell.textContent = "X";
        checkWinner();
        if (!isWinner) {
          computerTurn();
        }
      }
      if (!isWinner) {
        checkDraw();
      }
    });
  });
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
          statusOfPlay.innerHTML = "You win!";
          isWinner = true;
          return;
        } else if (cells[combo[0]].textContent === "O") {
          statusOfPlay.innerHTML = "Computer wins!";
          isWinner = true;
          return;
        }
      }
    });
  }

  function computerTurn() {
    checkDraw();
    if (isWinner || isDraw) return;
    let emptyCells = [];
    cells.forEach((cell) => {
      if (cell.textContent === "") {
        emptyCells.push(cell);
      }
    });
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";
    checkWinner();
  }

