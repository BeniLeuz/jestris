import './style.css';
import { shape } from './shape.ts';

const c = document.getElementById("game") as HTMLCanvasElement;
const canvas = c.getContext("2d")!;
let oldTime = 0;
const timePerTick = 1000 / 60;
let movingShape = shape(0, 0, "blue");
let shapeList = [movingShape];
const tileSize = 25;


window.requestAnimationFrame(gameLoop);

function gameLoop(timeStamp: number) {
  const delta = timeStamp - oldTime;

  // we have 55 frames per sec rn
  if (delta >= timePerTick) {
    render();
    tick();

    oldTime = timeStamp;
  }

  window.requestAnimationFrame(gameLoop);
}

function tick() {

}

function render() {
  canvas.fillRect(movingShape.x, movingShape.y, tileSize, tileSize);
  canvas.fillStyle = movingShape.color;
}
