import { keys, ctx } from "./index.js";
import {
  spritePositionToImagePosition,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
  BORDER_WIDTH,
  SPACING_WIDTH,
} from "./Util.js";
import { SOUNDS } from "./constants.js";

export default class Player {
  constructor(sprites, keyImg) {
    this.hasLock = false;

    // Dim
    this.x = 0.2 * screen.width;
    this.y = 0.65 * screen.height - 90;
    this.width = SPRITE_WIDTH;
    this.height = SPRITE_HEIGHT;

    // Velocity
    this.dx = 0;

    // state
    this.state = "idle";

    // animation
    this.sprite = sprites;
    this.imgs = {
      idle: [[0, 0]],
      left: [
        [6, 1],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
      ],
      right: [
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 8],
      ],
    };
    this.curr = 0;

    this.keyImg = keyImg;

    this.bah = ["bahhhh", "ba baahh", "bbbaaahh"]
  }

  // Function to render the player
  render() {
    let st = "idle";
    if (this.state === "walk") {
      if (this.dx > 0) {
        st = "right";
      } else if (this.dx < 0) {
        st = "left";
      }
    }
    let row = this.imgs[st][Math.floor(this.curr / 3)][0];
    let col = this.imgs[st][Math.floor(this.curr / 3)][1];
    let position = spritePositionToImagePosition(row, col);
    ctx.drawImage(
      this.sprite,
      position.x,
      position.y,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      this.x,
      this.y,
      SPRITE_WIDTH,
      SPRITE_HEIGHT
    );

    this.curr = (this.curr + 1) % (this.imgs[st].length * 3);

    if (this.hasLock) {
      ctx.drawImage(this.keyImg, this.x - 20, this.y - 30);
    }
  }

  update() {
    if (this.state === "idle") {
      // need animation
      if (keys.right || keys.left) {
        this.state = "walk";
        this.curr = 0;
        let dir = keys.right ? 1 : -1;
        this.dx = dir * 5;
      }
    } else if (this.state === "walk") {
      this.x += this.dx;
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > screen.width) {
        this.x = screen.width;
      }

      if (this.dx < 0 && !keys.left) {
        this.state = "idle";
        this.curr = 0;
      } else if (this.dx > 0 && !keys.right) {
        this.state = "idle";
        this.curr = 0;
      }
    }

    if (keys.space) {
      SOUNDS["bah"][Math.floor(Math.random() * 4)].play();
      keys.space = false;
    }
  }
}
