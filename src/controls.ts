export let keyState: Direction | null = null;

export const DIRECTION = {
  LEFT: 'a',
  RIGHT: 'd',
  DOWN: 's',
  LEFTARROW: 'ArrowLeft',
  RIGHTARROW: 'ArrowRight',
  DOWNARROW: 'ArrowDown',
  SPACE: ' ',
} as const;

type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

// but how disgusting is this typedefini.., ehm typeannotation btw :D
export let pressedKeys: { [Identifier: string]: boolean } = {};

document.onkeydown = (e: KeyboardEvent) => {
  e.preventDefault();
  pressedKeys[e.key] = true;
};

document.onkeyup = (e: KeyboardEvent) => {
  e.preventDefault();
  pressedKeys[e.key] = false;
};
