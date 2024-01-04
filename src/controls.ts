export let keyState: Direction | null = null;



export const DIRECTION = {
  LEFT: 'a',
  RIGHT: 'd',
  DOWN: 's',
  LEFTARROW: 'ArrowLeft',
  RIGHTARROW: 'ArrowRight',
  DOWNARROW: 'ArrowDown',
} as const;

type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export let pressedKeys = {};

document.onkeydown = (e: KeyboardEvent) => {
  e.preventDefault();
  // nice eliminated whole switch statement couldnt care less if other keys are on true i wont look at them :)
  pressedKeys[e.key] = true;
};

document.onkeyup = (e: KeyboardEvent) => {
  e.preventDefault();
  // nice eliminated whole switch statement
  pressedKeys[e.key] = false;
};
