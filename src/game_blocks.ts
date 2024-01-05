type Block = number[][];

// for rotation we should use 3x3 matrix so we know the center always
const mDefintions = {
  JBLOCK: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ] as Block,
  LBLOCK: [
    [0, 0, 1], 
    [1, 1, 1],
    [0, 0, 0] 
  ] as Block,
  OBLOCK: [
    [1, 1], 
    [1, 1]] as Block,
  TBLOCK: [
    [0, 1, 0], 
    [1, 1, 1],
    [0, 0, 0] 
  ] as Block,
  IBLOCK: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ] as Block,
  SBLOCK: [
    [0, 1, 1], 
    [1, 1, 0],
    [0, 0, 0]
  ] as Block,
  ZBLOCK: [
    [1, 1, 0], 
    [0, 1, 1],
    [0, 0, 0]
  ] as Block
} as const;

export default mDefintions;
