type Block = number[][];

const mDefintions = {
  JBLOCK: [[1], [1, 1, 1]]as Block,
  LBLOCK: [[0, 0, 1], [1, 1, 1]]as Block,
  OBLOCK: [[1, 1], [1, 1]]as Block,
  TBLOCK: [[0, 1, 0], [1, 1, 1]]as Block,
  IBLOCK: [[1, 1, 1, 1]]as Block,
  SBLOCK: [[0, 1, 1], [1, 1, 0]]as Block,
  ZBLOCK: [[1, 1, 0], [0, 1, 1]]as Block
} as const;

export default mDefintions;
