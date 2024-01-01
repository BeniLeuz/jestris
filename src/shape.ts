import { TILESIZE, IBLOCK, JBLOCK, LBLOCK } from "./game_blocks.ts";
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
  
  x = x + 250 - 2 * TILESIZE;
  return { x, y, color, mDefinition };
}

export function generateRandomShape() {
  let shapeCount = 8;
  let randomShapeNum = Math.floor(Math.random() * shapeCount + 1);
  let randomShape;

  // for debugging TODO:
  return generateLBLOCK();
  switch (randomShapeNum) {
    case 1:
      randomShape = generateJBLOCK();
      break;
    case 2:
      randomShape = generateJBLOCK();
      break;
    case 3:
      randomShape = generateJBLOCK();
      break;
    case 4:
      randomShape = generateJBLOCK();
      break;
    case 5:
      randomShape = generateJBLOCK();
      break;
    case 6:
      randomShape = generateJBLOCK();
      break;
    case 7:
      randomShape = generateJBLOCK();
      break;
    case 8:
      randomShape = generateJBLOCK();
      break;
    default:
      break;
  }

  return randomShape;
}


// TODO: do functions for all of these blocks, and change the random to work with others
export function generateIBLOCK() {
  return shape(0, 0, "#00ffff", IBLOCK);
}

export function generateJBLOCK() {
  return shape(0, 0, "#00ffff", JBLOCK);
}

export function generateLBLOCK() {
  return shape(0, 0, "#00ffff", LBLOCK);
}
