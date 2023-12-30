import './style.css'


const c = document.getElementById("game") as HTMLCanvasElement;
const ctx = c.getContext("2d");
let counter = 0;
let counter2 = 0;
let oldTime = 0;
const timePerTick = 1000 / 60;

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

}
