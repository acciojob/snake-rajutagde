//your code here
const ROWS = 40;
const COLS = 40;
const PIXEL_SIZE = 10;
const GAME_SPEED = 100; // ms per frame

const container = document.getElementById("gameContainer");
const scoreBoard = document.createElement("div");
scoreBoard.className = "scoreBoard";
scoreBoard.innerText = "Score: 0";
container.appendChild(scoreBoard);

let score = 0;
let direction = "right";
let snake = [{ row: 20, col: 1 }];
let food = generateFood();
let gameLoop;

function startGame() {
  gameLoop = setInterval(moveSnake, GAME_SPEED);
  document.addEventListener("keydown", changeDirection);
}

function stopGame() {
  clearInterval(gameLoop);
  document.removeEventListener("keydown", changeDirection);
}

function moveSnake() {
  const head = getHead();
  const newHead = getNextHead(head);
  if (isCollision(newHead)) {
    stopGame();
    alert(`Game Over! Score: ${score}`);
    return;
  }
  snake.unshift(newHead);
  if (isEatingFood(newHead)) {
    score++;
    scoreBoard.innerText = `Score: ${score}`;
    food = generateFood();
  } else {
    snake.pop();
  }
  updateSnake();
}

function getHead() {
  return snake[0];
}

function getNextHead(head) {
  const { row, col } = head;
  switch (direction) {
    case "up":
      return { row: (row - 1 + ROWS) % ROWS, col };
    case "down":
      return { row: (row + 1) % ROWS, col };
    case "left":
      return { row, col: (col - 1 + COLS) % COLS };
    case "right":
      return { row, col: (col + 1) % COLS };
  }
}

function isCollision(head) {
  return snake.some((body) => body.row === head.row && body.col === head.col);
}

function isEatingFood(head) {
  return head.row === food.row && head.col === food.col;
}

function updateSnake() {
  const snakePixels = document.querySelectorAll(".snakeBodyPixel");
  for (let i = 0; i < snakePixels.length; i++) {
    const body = snake[i];
    const pixel = snakePixels[i];
    pixel.style.top = `${body.row * PIXEL_SIZE}px`;
    pixel.style.left = `${body.col * PIXEL_SIZE}px`;
 
