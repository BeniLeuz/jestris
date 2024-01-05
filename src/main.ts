import constants from "./constants.ts";
import "./style.css";
import { Shape, generateRandomShape } from "./shape.ts";
import { pressedKeys, DIRECTION } from "./controls.ts";
// fyi: added shape names and such to readme

// counter to how many ticks it takes to move one down, fast rn because debuggin
// anyway kionda buggy speedup rn TODO:
let moveCounterForSpeedup: number = 5;

// how many pending ticks it actually takes to move
let countToMove: number = 30;
let oldTime: number = 0;
const timePerTick: number = 1000 / 60;
// list of shapes that are already set, we set one for the start
let shapeList: Shape[] = [];

// boardMatrice of the shapes that are already set on ground
let boardMatrice: number[][] = [...Array(constants.HEIGHT / constants.TILESIZE)].map(() => Array(constants.WIDTH / constants.TILESIZE).fill(0));

setCurrentShape(generateRandomShape());

function moveDirection() {
  if (pressedKeys[DIRECTION.LEFT]) {
    moveLeft();
  }
  if (pressedKeys[DIRECTION.RIGHT]) {
    moveRight();
  }
  if (pressedKeys[DIRECTION.DOWN]) {
    moveDown();
  }
  if (pressedKeys[DIRECTION.LEFTARROW]) {
    moveLeft();
  }
  if (pressedKeys[DIRECTION.RIGHTARROW]) {
    moveRight();
  }
  if (pressedKeys[DIRECTION.DOWNARROW]) {
    moveDown();
  }
}

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
  if (!canMoveDown()) {
    addShapeToBoard();
    setCurrentShape(generateRandomShape());
    // TODO: have some  time to move the shape before it gets stuck
  }

  // looks at inputs and moves
  // moves the tile with speed up
  // setting undefined board matrice 20/4
  moveDirection();
  move();
}

function render() {
  constants.CANVAS.clearRect(0, 0, constants.WIDTH, constants.HEIGHT);
  for (let index = 0; index < shapeList.length; index++) {
    // for every shape we draw the full matrice
    for (let i = 0; i < shapeList[index].mDefinition.length; i++) {
      for (let j = 0; j < shapeList[index].mDefinition[i].length; j++) {
        let tile = shapeList[index];

        // skip possible 0 definitions which are just here to count up the index to know where to draw
        if (tile.mDefinition[i][j] != 1) {
          continue;
        }

        let x = tile.x + j * constants.TILESIZE;
        let y = tile.y + i * constants.TILESIZE;

        constants.CANVAS.fillStyle = shapeList[index].color;
        constants.CANVAS.fillRect(x, y, constants.TILESIZE, constants.TILESIZE);
      }
    }
  }
}

// returns the last shape in list which we consider to be the current
function currentShape(): Shape {
  return shapeList[shapeList.length - 1];
}

function setCurrentShape(shapeObj: Shape) {
  shapeList.push(shapeObj);
}

// this adds the current shape to the board so we can easily check for collision inside our board grid
function addShapeToBoard() {
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {
      // setting row of boardmatrice with the parts that were already done

      let row = currentShape().y / constants.TILESIZE + i;
      let col = currentShape().x / constants.TILESIZE + j;
      console.log("setting board matrice");
      console.log(row, col);
      console.log(boardMatrice)
      boardMatrice[row][col] = currentShape().mDefinition[i][j];
    }
  }
}

// checks if it can move left and moves the currentShape
function moveLeft() {
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {
      // board row and col to check, with a shift for the one we are trying to check
      let row = currentShape().y / constants.TILESIZE + i;
      let col = currentShape().x / constants.TILESIZE + j - 1;

      if (colliding(row, col)) {
        return false;
      }
    }
  }
  currentShape().x -= constants.TILESIZE;
}

function moveRight() {
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {
      // board row and col to check, with a shift for the one we are trying to check
      let row = currentShape().y / constants.TILESIZE + i;
      let col = currentShape().x / constants.TILESIZE + j + 1;

      if (colliding(row, col)) {
        return false;
      }
    }
  }
  currentShape().x += constants.TILESIZE;
}

// move of the game which speeds up the more objects are created
function move() {
  if (canMoveDown()) {
    countToMove--;
    if (countToMove == 0) {
      // stop speeding up at some point
      if (moveCounterForSpeedup <= 5) {
        countToMove = moveCounterForSpeedup;
      } else {
        countToMove = moveCounterForSpeedup--;
      }
      currentShape().y += constants.TILESIZE;
    }
  }
}

function moveDown() {
  if (canMoveDown()) {
    currentShape().y += constants.TILESIZE;
  }
}

// this is to test if we can even move down at all in tick()
// not for the user move down input
function canMoveDown() {
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {
      if (currentShape().mDefinition[i][j] != 1) {
        continue;
      }

      // board row and col to check, with a shift for the one we are trying to check
      // we are bascially parsing the board indices from the x and y cords and the offset of the matrix loop
      let row = currentShape().y / constants.TILESIZE + i + 1;
      let col = currentShape().x / constants.TILESIZE + j;
      // if its 0 we can ignore it it can go down

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
