import mDefinitions from "./game_blocks.ts";
import constants from "./constants.ts";
import mDefintions from "./game_blocks.ts";
import { boardMatrice, colliding, currentShape } from "./main.ts";

export type Shape = {
  x: number;
  y: number;
  color: string;
  mDefinition: number[][];
};

// the matrix is the tiles it contains
export function shape(x: number, y: number, color: string, mDefinition: number[][]): Shape {
  // TODO: Not rounded to the left what it should be
  let offset = Math.floor(mDefinition[0].length / 2) * constants.TILESIZE;
  x = constants.TILESIZE * 5 - offset;

  // need to create copy or else rotations change all the shapes
  let mDefinitionCopy: number[][] = [];
  mDefinitionCopy = mDefinition.map((arr) => {
    return arr.slice();
  });

  return { x, y, color, mDefinition: mDefinitionCopy };
}


export function rotateShape(): boolean {
  // i = 0
  // j = 0, 1, 2
  // 00, 01, 02
  // 02, 12, 22

  // i = 1
  // j = 0, 1, 2
  // 10, 11, 12
  // 01, 11, 21


  // i = 2
  // j = 0, 1, 2
  // 20, 21, 22
  // 00, 10, 20
  // todo: do this inplace without temp
  // todo: check if rotation would collide with other shapes or out of bounds
  // todo: create wallkicks if it would collide or block it from rotating

  let temp = [];

  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    temp.push(currentShape().mDefinition[i].slice())
  }

  for (let i = 0; i < currentShape().mDefinition.length; i++) {
    for (let j = 0; j < currentShape().mDefinition[i].length; j++) {

      let newColIndex = currentShape().mDefinition.length - 1 - i;
      currentShape().mDefinition[j][newColIndex] = temp[i][j];
    }
  }

  if (checkCollision()) {
    currentShape().mDefinition = temp;
  }
  return true;
}



function checkCollision(): boolean {
  for(let i = 0; i < currentShape().mDefinition.length; i++) {
    for(let j = 0; j < currentShape().mDefinition[i].length; j++) {
      if(currentShape().mDefinition[i][j] != 1) {
        continue;
      }

      let row = currentShape().y / constants.TILESIZE + i;
      let col = currentShape().x / constants.TILESIZE + j;
      if(colliding(row, col)) {
        return true;
      }
    }
  }
  return false;
}

export function generateRandomShape(): Shape {
  let shapeCount = 7;
  let randomShapeNum = Math.floor(Math.random() * shapeCount + 1);
  let randomShape;

  switch (randomShapeNum) {
    case 1:
      randomShape = generateJBLOCK();
      break;
    case 2:
      randomShape = generateIBLOCK();
      break;
    case 3:
      randomShape = generateLBLOCK();
      break;
    case 4:
      randomShape = generateOBLOCK();
      break;
    case 5:
      randomShape = generateSBLOCK();
      break;
    case 6:
      randomShape = generateZBLOCK();
      break;
    case 7:
      randomShape = generateTBLOCK();
      break;
    default:
      randomShape = generateTBLOCK();
      break;
  }

  return randomShape;
}


// TODO: do functions for all of these blocks, and change the random to work with others
export function generateIBLOCK() {
  return shape(0, 0, "#00ffff", mDefinitions.IBLOCK);
}

export function generateJBLOCK() {
  return shape(0, 0, "#0000ff", mDefinitions.JBLOCK);
}

export function generateLBLOCK() {
  return shape(0, 0, "#ff7f00", mDefinitions.LBLOCK);
}

export function generateOBLOCK() {
  return shape(0, 0, "#ffff00", mDefinitions.OBLOCK);
}

export function generateSBLOCK() {
  return shape(0, 0, "#00ff00", mDefinitions.SBLOCK);
}

export function generateTBLOCK() {
  return shape(0, 0, "#800080", mDefinitions.TBLOCK);
}

export function generateZBLOCK() {
  return shape(0, 0, "#ff0000", mDefinitions.ZBLOCK);
}

