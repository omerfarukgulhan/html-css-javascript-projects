const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector(".startButton");
const difficulties = document.querySelectorAll('input[name="difficulty"]');
const timeLeft = document.querySelector("#timeLeft");
const playTime = document.querySelectorAll('input[name="time"]');

let lastHole;
let timeUp = false;
let score = 0;
let min = 200; // Default difficulty is 200 milisec.
let timer = 10000; // Default play time is 10 seconds.
let counter = 0;

eventListener();

function eventListener() {
  moles.forEach((mole) => mole.addEventListener("click", moleDown));
  startButton.addEventListener("click", startGame);
  difficulties.forEach((difficulty) => {
    difficulty.addEventListener("change", () => (min = parseInt(difficulty.value)));
  });
  playTime.forEach((time) => {
    time.addEventListener("change", () => (timer = parseInt(time.value)));
  });
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function moleUp() {
  const time = randomTime(min, min * 5);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) moleUp();
  }, time);
}

function startGame() {
  counter = 0;
  timeLeft.innerHTML = `Time Left:${timer / 1000 + counter}`;
  counter--;
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  moleUp();
  setTimeout(() => {
    timeUp = true;
    clearInterval(interval);
    timeLeft.innerHTML = "Time's Up!";
  }, timer);

  const interval = setInterval(function () {
    timeLeft.innerHTML = `Time Left:${timer / 1000 + counter}`;
    counter--;
  }, 1000);
}

function moleDown(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}
