type Block = number[][];

// for rotation we should use 3x3 matrix so we know the center always
const mDefintions = {
  JBLOCK: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ] as Block,
  LBLOCK: [
    [0, 0, 3], 
    [3, 3, 3],
    [0, 0, 0] 
  ] as Block,
  OBLOCK: [
    [4, 4], 
    [4, 4]] as Block,
  TBLOCK: [
    [0, 7, 0], 
    [7, 7, 7],
    [0, 0, 0] 
  ] as Block,
  IBLOCK: [
    [0, 0, 0, 0],
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ] as Block,
  SBLOCK: [
    [0, 5, 5], 
    [5, 5, 0],
    [0, 0, 0]
  ] as Block,
  ZBLOCK: [
    [6, 6, 0], 
    [0, 6, 6],
    [0, 0, 0]
  ] as Block
} as const;

export default mDefintions;
