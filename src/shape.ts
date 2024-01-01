import mDefinitions from "./game_blocks.ts";
import constants from "./constants.ts";

export type Shape = {
  x: number;
  y: number;
  color: string;
  mDefinition: number[][];
};

// the matrix is the tiles it contains
export function shape(x: number, y: number, color: string, mDefinition: number[][]): Shape {
  // 250 is half of the width and a bit of minus because its mostly in the middle but can change this nicely
  // TODO change this to be in the middle with width taken from the WIDTH constant
  // maybe just fix this with making all the matrices 4x2
  x = x + 250 - 2 * constants.TILESIZE;
  return { x, y, color, mDefinition };
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

