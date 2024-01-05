const C: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;

let tilesize = 35;
C.width = tilesize * 10;
C.height = tilesize * 20;

const constants = {
  TILESIZE: tilesize,
  WIDTH: C.width,
  HEIGHT: C.height,
  CANVAS: C.getContext("2d") as CanvasRenderingContext2D
} as const;

export default constants;

