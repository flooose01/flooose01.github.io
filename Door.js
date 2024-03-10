import { keys, ctx, player } from "./index.js";
import { SOUNDS } from "./constants.js";
export default class Door {
  constructor() {
    this.x = 0.8 * screen.width;
    this.y = 0.65 * screen.height - 130;
    this.height = 130;
    this.width = 100;

    this.locked = true;
  }

  render() {
    if (
      (player.x + player.width < this.x + this.width &&
        player.x + player.width > this.x) ||
      (player.x < this.x + this.width && player.x > this.x)
    ) {
      ctx.font = "10px pixel";
      if (this.locked) {
        if (!player.hasLock) {
          ctx.fillText("locked!", this.x, this.y - 10);
        } else {
          ctx.fillText("press e to", this.x, this.y - 20);
          ctx.fillText("unlock", this.x, this.y - 8);
        }
      } else {
        ctx.fillText("press e to", this.x, this.y - 20);
        ctx.fillText("enter", this.x, this.y - 8);
      }
    }

    if (this.locked) {
      ctx.fillStyle = "#964B00";
    } else {
      ctx.fillStyle = "#000000";
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (keys.e) {
      if (
        (player.x + player.width < this.x + this.width &&
          player.x + player.width > this.x) ||
        (player.x < this.x + this.width && player.x > this.x)
      ) {
        if (player.hasLock) {
          this.locked = false;
          player.hasLock = false;
          keys.e = false;
          SOUNDS["unlock"].play();
        }
      } else {
      }
      keys.e = false;
    }
  }
}
