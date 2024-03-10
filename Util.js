export const SPRITE_WIDTH = Math.floor(627 / 9);
export const SPRITE_HEIGHT = Math.floor(978 / 9);
export const BORDER_WIDTH = 1;
export const SPACING_WIDTH = 1;
export function spritePositionToImagePosition(row, col) {
  return {
    x: BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH),
    y: BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT),
  };
}

export function shuffle(array) {
  let currentIndex = array.length * array[0].length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let i1 = Math.floor(randomIndex / array[0].length);
    let j1 = randomIndex % array[0].length;

    let i2 = Math.floor(currentIndex / array[0].length);
    let j2 = currentIndex % array[0].length;

    // And swap it with the current element.
    [array[i2][j2], array[i1][j1]] = [array[i1][j1], array[i2][j2]];
  }

  return array;
}

export function imagePositionToImagePosition(
  row,
  col,
  bwidth,
  swidth,
  sprwidth,
  sprheight
) {
  return {
    x: bwidth + col * (swidth + sprwidth),
    y: bwidth + row * (swidth + sprheight),
  };
}
