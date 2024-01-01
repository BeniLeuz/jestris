import { TILESIZE, IBLOCK, JBLOCK } from "./game_blocks.ts";
// x, y defined the place where it should be rendered
//
// the matrix is the tiles it contains
export function shape(x: number, y: number, color: string, mDefinition) {
  x = x + 250 - 2 * TILESIZE;
  return { x, y, color, mDefinition };
}

export function generateRandomShape() {
  let shapeCount = 8;
  let randomShapeNum = Math.floor(Math.random() * shapeCount + 1);
  let randomShape;

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
