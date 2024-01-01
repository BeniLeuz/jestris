import { TILESIZE } from "./game_blocks.js";
import './style.css';
import { generateRandomShape, shape } from './shape.ts';

// fyi: added shape names and such to readme

const c = document.getElementById("game") as HTMLCanvasElement;
const canvas = c.getContext("2d")!;
const WIDTH = 500;
const HEIGHT = 750;
// counter to how many ticks it takes to move one down, fast rn because debuggin
let moveCounterForSpeedup = 5;

// how many pending ticks it actually takes to move
let countToMove = 30;
let oldTime = 0;
const timePerTick = 1000 / 60;
// list of shapes that are already set, we set one for the start
let shapeList = [];

// boardMatrice of the shapes that are already set on ground
let boardMatrice = [...Array(HEIGHT / TILESIZE)].map(e => Array(WIDTH / TILESIZE).fill(0));
setCurrentShape(generateRandomShape());


// i mean this even runs faster than 60 fps basically so idk how great that will work
document.onkeydown = function(e) {
  // 1 for left, 2 for right, 3 for down
  switch (e.key) {
    case "a":
      moveLeft();
      break;
    case "d":
      moveRight();
      break;
    case "s":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowDown":
      moveDown();
      break;
    default:
      break;
  }
  e.preventDefault();
  // update on eventkey
};

window.requestAnimationFrame(gameLoop);

function gameLoop(timeStamp: number) {
  const delta = timeStamp - oldTime;

  // we have 55 frames per sec rn
  if (delta >= timePerTick) {
    tick();
    render();

    oldTime = timeStamp;
  }

  window.requestAnimationFrame(gameLoop);
}

function tick() {
  // if movingshape empty add one todo: more like if (collided create new one)
  // if last item in shapelist is collided with another matrice we create a new one
  if (currentShape().y >= HEIGHT - TILESIZE || !canMoveDown()) {
    addShapeToBoard(currentShape());
    setCurrentShape(generateRandomShape());
  }

  // moves the tile with speed up
  move();
}

function render() {
  canvas.clearRect(0, 0, WIDTH, HEIGHT);
  for (let index = 0; index < shapeList.length; index++) {
    // for every shape we draw the full matrice
    for (let i = 0; i < shapeList[index].mDefinition.length; i++) {
      for (let j = 0; j < shapeList[index].mDefinition[i].length; j++) {
        // wont work if matrix definition has 0 values to say how it is
        canvas.fillRect(shapeList[index].x + j * TILESIZE, shapeList[index].y + i * TILESIZE, TILESIZE, TILESIZE);
        canvas.fillStyle = shapeList[index].color;
      }
    }
  }
}

// returns the last shape in list which we consider to be the current
function currentShape() {
  return shapeList[shapeList.length - 1]
}

function setCurrentShape(shapeObj) {
  shapeList.push(shapeObj);
}

// this adds a shape to the board so we can easily check for collision inside our board grid
function addShapeToBoard(shapeObj) {
  for (let i = 0; i < shapeObj.mDefinition.length; i++) {
    for (let j = 0; j < shapeObj.mDefinition[i].length; j++) {
      // setting row of boardmatrice with the parts that were already done

      let row = (shapeObj.y / TILESIZE) + i
      let col = (shapeObj.x / TILESIZE) + j
      boardMatrice[row][col] = shapeObj.mDefinition[i][j];
    }
  }
}


// checks if it can move left and moves the currentShape
function moveLeft() {
  let shapeObj = currentShape();
  for (let i = 0; i < shapeObj.mDefinition.length; i++) {
    for (let j = 0; j < shapeObj.mDefinition[i].length; j++) {

      // board row and col to check, with a shift for the one we are trying to check
      let row = (shapeObj.y / TILESIZE) + i;
      let col = (shapeObj.x / TILESIZE) + j - 1;

      if (colliding(row, col)) {
        return false;
      }
    }
  }
  shapeObj.x -= TILESIZE;
}

function moveRight() {
  let shapeObj = currentShape();
  for (let i = 0; i < shapeObj.mDefinition.length; i++) {
    for (let j = 0; j < shapeObj.mDefinition[i].length; j++) {

      // board row and col to check, with a shift for the one we are trying to check
      let row = (shapeObj.y / TILESIZE) + i;
      let col = (shapeObj.x / TILESIZE) + j + 1;

      if (colliding(row, col)) {
        return false;
      }
    }
  }
  shapeObj.x += TILESIZE;
}


// move of the game which speeds up the more objects are created
function move() {
  countToMove--
  if (countToMove == 0) {
    // stop speeding up at some point
    if (moveCounterForSpeedup <= 5) {
      countToMove = moveCounterForSpeedup;
    } else {
      countToMove = moveCounterForSpeedup--;
    }

    currentShape().y += TILESIZE;
  }
}

function moveDown() {
  if (canMoveDown()) {
    currentShape().y += TILESIZE;
  }
}


// this is to test if we can even move down at all in tick()
// not for the user move down input
function canMoveDown() {
  let shapeObj = currentShape();
  for (let i = 0; i < shapeObj.mDefinition.length; i++) {
    for (let j = 0; j < shapeObj.mDefinition[i].length; j++) {
      // board row and col to check, with a shift for the one we are trying to check
      let row = (shapeObj.y / TILESIZE) + i + 1;
      let col = (shapeObj.x / TILESIZE) + j;

      if (colliding(row, col)) {
        return false;
      }
    }
  }
  return true;
}


// checks if given row and number would collide with a still shape
function colliding(row: number, col: number) {
  if (boardMatrice.length <= row) {
    return true;
  }
  if (boardMatrice[row].length <= col) {
    return true;
  }
  if (boardMatrice[row][col] != 0) {
    return true;
  }
  true;
}

