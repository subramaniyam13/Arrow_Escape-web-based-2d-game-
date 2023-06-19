const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 800;
canvas.height = 400;

// Character properties
const characterWidth = 50;
const characterHeight = 50;
let characterX = canvas.width / 2 - characterWidth / 2;
let characterY = canvas.height - characterHeight - 10;
const characterSpeed = 5;

// Obstacle properties
const obstacleWidth = 50;
const obstacleHeight = 50;
let obstacleX = canvas.width;
let obstacleY = canvas.height - obstacleHeight - 10;
const obstacleSpeed = 3;

// Keyboard event listeners
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

function handleKeyDown(event) {
  if (event.key === "ArrowLeft" || event.key === "Left") {
    leftPressed = true;
  } else if (event.key === "ArrowRight" || event.key === "Right") {
    rightPressed = true;
  } else if (event.key === "ArrowUp" || event.key === "Up") {
    upPressed = true;
  } else if (event.key === "ArrowDown" || event.key === "Down") {
    downPressed = true;
  }
}

function handleKeyUp(event) {
  if (event.key === "ArrowLeft" || event.key === "Left") {
    leftPressed = false;
  } else if (event.key === "ArrowRight" || event.key === "Right") {
    rightPressed = false;
  } else if (event.key === "ArrowUp" || event.key === "Up") {
    upPressed = false;
  } else if (event.key === "ArrowDown" || event.key === "Down") {
    downPressed = false;
  }
}

function drawCharacter() {
  ctx.beginPath();
  ctx.rect(characterX, characterY, characterWidth, characterHeight);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

function drawObstacle() {
  ctx.beginPath();
  ctx.rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function moveCharacter() {
  if (leftPressed && characterX > 0) {
    characterX -= characterSpeed;
  } else if (rightPressed && characterX < canvas.width - characterWidth) {
    characterX += characterSpeed;
  } else if (upPressed && characterY > 0) {
    characterY -= characterSpeed;
  } else if (downPressed && characterY < canvas.height - characterHeight) {
    characterY += characterSpeed;
  }
}

function moveObstacle() {
  if (obstacleX < 0) {
    obstacleX = canvas.width;
    obstacleY = Math.random() * (canvas.height - obstacleHeight);
  } else {
    obstacleX -= obstacleSpeed;
  }
}

function checkCollision() {
  if (
    characterX < obstacleX + obstacleWidth &&
    characterX + characterWidth > obstacleX &&
    characterY < obstacleY + obstacleHeight &&
    characterY + characterHeight > obstacleY
  ) {
    return true;
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCharacter();
  drawObstacle();

  if (checkCollision()) {
    alert("Game Over!");
    document.location.reload();
  }

  moveCharacter();
  moveObstacle();

  requestAnimationFrame(draw);
}

draw();
