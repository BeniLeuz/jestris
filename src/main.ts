import { TILESIZE, IBLOCK } from "./game_blocks.js";
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
  if (currentShape().y >= HEIGHT - TILESIZE ||  !canMoveDown(currentShape())) {
    addShapeToBoard(currentShape());
    setCurrentShape(generateRandomShape());
  }

  // update y position and get faster the more objects are created speedup removed for debuggin
  countToMove--
  if (countToMove == 0) {
    // if we have 20 objects created we stop speeding up and just plainly set it to 10
    if (moveCounterForSpeedup <= 5) {
      countToMove = moveCounterForSpeedup;
    } else {
      countToMove = moveCounterForSpeedup--;
    }
    currentShape().y += TILESIZE;
  }
}

function render() {
  canvas.clearRect(0, 0, WIDTH, HEIGHT);
  for (let index = 0; index < shapeList.length; index++) {
    // for every shape we draw the full matrice
    for (let i = 0; i < shapeList[index].mDefinition.length; i++) {
      for (let j = 0; j < shapeList[index].mDefinition[i].length; j++) {
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

// check if shape can move down
function canMoveDown(shapeObj) {
  for (let i = 0; i < shapeObj.mDefinition.length; i++) {
    for (let j = 0; j < shapeObj.mDefinition[i].length; j++) {
      // setting row of boardmatrice with the parts that were already done

      let row = (shapeObj.y / TILESIZE) + i
      let col = (shapeObj.x / TILESIZE) + j

      if (boardMatrice.length <= row + 1) {
        return false
      }
      // todo check if the other array index is out of range as well
      if (boardMatrice[row + 1][col] != 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
