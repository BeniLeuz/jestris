export let keyState: Direction | null = null;

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
} as const;

type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];
let keyStack: string[] = [];

document.onkeydown = (e: KeyboardEvent) => {
  e.preventDefault();
  if (!keyStack.includes(e.key)) {
    keyStack.push(e.key);
  }
  switch (keyStack[keyStack.length - 1]) {
    case 'a':
      keyState = DIRECTION.LEFT;
      break;
    case 'd':
      keyState = DIRECTION.RIGHT;
      break;
    case 's':
      keyState = DIRECTION.DOWN;
      break;
    case 'ArrowLeft':
      keyState = DIRECTION.LEFT;
      break;
    case 'ArrowRight':
      keyState = DIRECTION.RIGHT;
      break;
    case 'ArrowDown':
      keyState = DIRECTION.DOWN;
      break;
    default:
      break;
  }
};

document.onkeyup = (e: KeyboardEvent) => {
  e.preventDefault();
  const index = keyStack.indexOf(e.key);
  if (index > -1) {
    keyStack.splice(index, 1);
  }
  if (keyStack.length > 0) {
    switch (keyStack[keyStack.length - 1]) {
      case 'a':
        keyState = DIRECTION.LEFT;
        break;
      case 'd':
        keyState = DIRECTION.RIGHT;
        break;
      case 's':
        keyState = DIRECTION.DOWN;
        break;
      case 'ArrowLeft':
        keyState = DIRECTION.LEFT;
        break;
      case 'ArrowRight':
        keyState = DIRECTION.RIGHT;
        break;
      case 'ArrowDown':
        keyState = DIRECTION.DOWN;
        break;
      default:
        break;
    }
  } else {
    keyState = null;
  }
};
