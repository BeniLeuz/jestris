import * as mDefinitionsShapes from "./game_blocks.ts";
// x, y defined the place where it should be rendered
//
//
type Shape = {
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
  x = x + 250 - 2 * mDefinitionsShapes.TILESIZE;
  return { x, y, color, mDefinition };
}

export function generateRandomShape() {
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
      break;
  }

  return randomShape;
}


// TODO: do functions for all of these blocks, and change the random to work with others
export function generateIBLOCK() {
  return shape(0, 0, "#00ffff", mDefinitionsShapes.IBLOCK);
}

export function generateJBLOCK() {
  return shape(0, 0, "#0000ff", mDefinitionsShapes.JBLOCK);
}

export function generateLBLOCK() {
  return shape(0, 0, "#ff7f00", mDefinitionsShapes.LBLOCK);
}

export function generateOBLOCK() {
  return shape(0, 0, "#ffff00", mDefinitionsShapes.OBLOCK);
}

export function generateSBLOCK() {
  return shape(0, 0, "#00ff00", mDefinitionsShapes.SBLOCK);
}

export function generateTBLOCK() {
  return shape(0, 0, "#800080", mDefinitionsShapes.TBLOCK);
}

export function generateZBLOCK() {
  return shape(0, 0, "#ff0000", mDefinitionsShapes.ZBLOCK);
}

