import FinalLevel from "./FinalLevel.js";
import PuzzleLevel from "./PuzzleLevel.js";
import BaseLevel from "./BaseLevel.js";
import { platform, ctx, keys } from "./index.js";
import { SOUNDS } from "./constants.js";

export default class Level {
  constructor(player, images) {
    this.currLevel = 0;
    this.levels = [
      new BaseLevel(),
      new PuzzleLevel(2, 3, 302, 403, images[0], player),
      new PuzzleLevel(3, 4, 270, 480, images[1], player),
      new PuzzleLevel(4, 4, 443, 332, images[2], player),
      new FinalLevel(player),
    ];

    this.levels[0].door.locked = false;
    this.player = player;
  }

  render() {
    ctx.fillStyle = "#e6e3b3";
    ctx.fillRect(0, 0, screen.width, screen.height);

    ctx.fillStyle = "#07752a";
    ctx.fillRect(
      platform.x,
      platform.y,
      platform.width + platform.x,
      platform.height + platform.y
    );

    this.levels[this.currLevel].render();
  }

  update() {
    if (!this.levels[this.currLevel].door.locked) {
      if (keys.e) {
        SOUNDS["enter"].play();
        this.currLevel++;
        keys.e = false;
      }
    }

    this.levels[this.currLevel].update();
  }
}
