let darkMood = document.querySelector(".dark-mode");
let lightMood = document.querySelector(".light-mode");
let Mood = document.querySelector(".mode");
let wrap = document.querySelector("#wrapper");
let click = "0";

darkMood.addEventListener("click", function () {
  if (click == 0) {
    wrap.classList.add("drkmood");
    console.log("hii");
    lightMood.classList.add("active");
    click = "1";
  }
});
lightMood.addEventListener("click", function () {
  if (click == 1) {
    wrap.classList.remove("drkmood");
    console.log("hii");
    lightMood.classList.remove("active");
    click = "0";
  }
});

// ****************************************************************************

const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const btn = document.querySelector(".btn2");
const gameInfor = document.querySelector(".gameInfor");

let currentPlayer;
let gameGrid;

const winPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function gameIni() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box ${index + 1}`;
  });
  // btn.classList.add("active2");
  gameInfor.innerText = `Current Player -${currentPlayer}`;
}
gameIni();

function swapTuren() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function chackGameOver() {
  btn.classList.add("active2");
  let answer = "";
  winPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") answer = "X";
      else {
        answer = "O";
      }
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    btn.classList.remove("active2");

    return;
  }
  let filcount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") filcount++;
  });
  if (filcount === 9) {
    gameInfo.innerText = "Game Tied !";
    btn.classList.remove("active2");
  }
}
function reset() {
  gameGrid.forEach((box)=>{
    if (box !== "") {
      gameGrid.innerText = "";
      gameInfor.innerText = "Reset"
    btn.classList.remove("active2");
    }
  })
}
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    reset();
    swapTuren();

    chackGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});
// handleClick()

btn.addEventListener("click", gameIni);