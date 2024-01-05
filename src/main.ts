import constants from "./constants.ts";
import "./style.css";
import { Shape, generateRandomShape, rotateShape } from "./shape.ts";
import { pressedKeys, DIRECTION, updateKeyUp } from "./controls.ts";
// fyi: added shape names and such to readme


// objectmoving/speedup setup
const moveCounter: number = 30;
let countToMove: number = 30;
let objectsCreated: number = 0;

// directional moving slowdown
// TODO: fix this, feels bad. We kind of cant have hold and keypresses both being nice and instant
// https://stackoverflow.com/questions/7164735/differentiate-between-key-pressed-and-key-held
const moveDirectionCounterStatic = 4;
let directionalMoveCounter: number = moveDirectionCounterStatic;


let oldTime: number = 0;
const timePerTick: number = 1000 / 60;
// list of shapes that are already set, we set one for the start
let shapeList: Shape[] = [];

// boardMatrice of the shapes that are already set on ground
export let boardMatrice: number[][] = [...Array(constants.HEIGHT / constants.TILESIZE)].map(() => Array(constants.WIDTH / constants.TILESIZE).fill(0));

setCurrentShape(generateRandomShape());

function moveDirection(): void {
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
  if (pressedKeys[DIRECTION.SPACE]) {
    rotateShape(currentShape());
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
  removeFullLines();
  if (!canMoveDown()) {
    addShapeToBoard();
    setCurrentShape(generateRandomShape());
    // TODO: have some  time to move the shape before it gets stuck
  }


  // issue with this is: a single keypress will not always move the shape
  // but if we change it other way it will have nice single keypresses but holds will be too long
  directionalMoveCounter--;
  if (directionalMoveCounter <= 0) {
    moveDirection();
    directionalMoveCounter = moveDirectionCounterStatic;
  }

  move();
}


function render() {
  constants.CANVAS.clearRect(0, 0, constants.WIDTH, constants.HEIGHT);
  for (let i = 0; i < boardMatrice.length; i++) {
    for (let j = 0; j < boardMatrice[i].length; j++) {


      if (boardMatrice[i][j] != 0) {
        constants.CANVAS.fillStyle = chooseColor(boardMatrice[i][j]);
        constants.CANVAS.fillRect(j * constants.TILESIZE, i * constants.TILESIZE, constants.TILESIZE, constants.TILESIZE);
      }
    }
  }

  // render the current moving shape
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {
      if (currentShape().mDefinition[i][j] == 0) {
        continue;
      }
      constants.CANVAS.fillStyle = currentShape().color;
      constants.CANVAS.fillRect(currentShape().x + j * constants.TILESIZE, currentShape().y + i * constants.TILESIZE, constants.TILESIZE, constants.TILESIZE);
    }
  }
}

function chooseColor(shapeNumber: number): string {
  let color: string = "#ffffff";

  switch (shapeNumber) {
    case 1:
      color = "#0000ff";
      break;
    case 2:
      color = "#00ffff";
      break;
    case 3:
      color = "#ff7f00";
      break;
    case 4:
      color = "#ffff00";
      break;
    case 5:
      color = "#00ff00";
      break;
    case 6:
      color = "#ff0000";
      break;
    case 7:
      color = "#800080";
      break;
  }
  return color;
}

// returns the last shape in list which we consider to be the current
export function currentShape(): Shape {
  return shapeList[shapeList.length - 1];
}

function setCurrentShape(shapeObj: Shape) {
  // counter for speedup
  objectsCreated++;
  shapeList.push(shapeObj);
}

// this adds the current shape to the board so we can easily check for collision inside our board grid
function addShapeToBoard() {
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {

      if (currentShape().mDefinition[i][j] == 0) {
        continue;
      }

      let row = currentShape().y / constants.TILESIZE + i;
      let col = currentShape().x / constants.TILESIZE + j;
      boardMatrice[row][col] = currentShape().mDefinition[i][j];
    }
  }
}

// checks if it can move left and moves the currentShape
function moveLeft() {
  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {
      // board row and col to check, with a shift for the one we are trying to check
      if (currentShape().mDefinition[i][j] == 0) {
        continue;
      }
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

      if (currentShape().mDefinition[i][j] == 0) {
        continue;
      }

      let row = currentShape().y / constants.TILESIZE + i;
      let col = currentShape().x / constants.TILESIZE + j + 1;

      if (colliding(row, col)) {
        return false;
      }
    }
  }
  currentShape().x += constants.TILESIZE;
}

function move() {
  if (canMoveDown()) {
    countToMove--;
    if (countToMove == 0) {
      // every object which is created speeds up the game until move per 10 ticks
      let speedUpCounter = moveCounter - objectsCreated
      countToMove = speedUpCounter > 10 ? speedUpCounter : 10;
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
      if (currentShape().mDefinition[i][j] == 0) {
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
export function colliding(row: number, col: number) {
  if (boardMatrice.length <= row) {
    return true;
  }
  if (boardMatrice[row].length <= col) {
    return true;
  }
  if (boardMatrice[row][col] != 0) {
    return true;
  }
  false;
}

// removes the full lines
function removeFullLines() {
  for (let i = 0; i < boardMatrice.length; i++) {
    let row = boardMatrice[i];
    if (row.every((value) => value != 0)) {
      boardMatrice.splice(i, 1);
      boardMatrice.unshift(Array(constants.WIDTH / constants.TILESIZE).fill(0));
    }
  }
}
