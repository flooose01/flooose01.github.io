import Door from "./Door.js";
import { shuffle, imagePositionToImagePosition } from "./Util.js";
import { click, ctx } from "./index.js";
import { SOUNDS } from "./constants.js";

export default class PuzzleLevel {
  constructor(rows, cols, iwidth, iheight, image, player) {
    this.done = false;
    this.player = player;
    this.door = new Door();

    this.temp = [];
    this.image = image;
    // Loop through rows
    for (let i = 0; i < rows; i++) {
      let row2 = [];

      // Loop through columns for each row
      for (let j = 0; j < cols; j++) {
        row2.push([i, j]);
      }

      this.temp.push(row2);
    }
    this.iwidth = iwidth;
    this.iheight = iheight;
    shuffle(this.temp);
    this.startX = 0.3 * screen.width;
    this.startY = 10;
    this.select1 = {};
    this.sprwidth = Math.floor(this.iwidth / this.temp[0].length);
    this.sprheight = Math.floor(this.iheight / this.temp.length);
  }

  render() {
    this.door.render();

    this.drawShuffled();
  }

  update() {
    this.door.update();

    if (!this.done && this.checkCorrect()) {
      this.player.hasLock = true;
      this.done = true;
      SOUNDS["finish"].play();
    }
    if (!this.done) {
      if (click.clicked) {
        if (Object.keys(this.select1).length === 0) {
          if (
            click.x < this.startX + this.iwidth &&
            click.x > this.startX &&
            click.y > this.startY &&
            click.y < this.startY + this.iheight
          ) {
            let i = (click.y - this.startY) / this.sprheight;
            let j = (click.x - this.startX) / this.sprwidth;
            this.select1 = { i: Math.floor(i), j: Math.floor(j) };
          }
        } else {
          if (
            click.x < this.startX + this.iwidth &&
            click.x > this.startX &&
            click.y > this.startY &&
            click.y < this.startY + this.iheight
          ) {
            // swap image
            let i = Math.floor((click.y - this.startY) / this.sprheight);
            let j = Math.floor((click.x - this.startX) / this.sprwidth);
            let t = this.temp[i][j];
            this.temp[i][j] = this.temp[this.select1.i][this.select1.j];
            this.temp[this.select1.i][this.select1.j] = t;
            SOUNDS["swap"].play();
            this.select1 = {};
          }
        }

        click.clicked = false;
      }
    }
  }

  drawShuffled() {
    let arr = this.temp;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        let row = arr[i][j][0];
        let col = arr[i][j][1];

        let pos = imagePositionToImagePosition(
          row,
          col,
          0,
          0,
          this.sprwidth,
          this.sprheight
        );

        ctx.drawImage(
          this.image,
          pos.x,
          pos.y,
          this.sprwidth,
          this.sprheight,
          this.startX + j * this.sprwidth,
          this.startY + i * this.sprheight,
          this.sprwidth,
          this.sprheight
        );
      }
    }
  }

  checkCorrect() {
    for (let i = 0; i < this.temp.length; i++) {
      for (let j = 0; j < this.temp[0].length; j++) {
        if (this.temp[i][j][0] === i && this.temp[i][j][1] === j) {
        } else {
          return false;
        }
      }
    }

    return true;
  }
}
