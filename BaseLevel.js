import Door from "./Door.js";
import { ctx } from "./index.js";
export default class BaseLevel {
  constructor() {
    this.done = true;

    this.door = new Door();
    //this.door.locked = false;
    this.text = "Chella's Brave Adventure!";
    this.curr = 0;
    this.text2 = "Enter that door!";
    this.curr2 = 0;
  }

  render() {
    this.door.render();
    ctx.font = "20px pixel";
    ctx.fillStyle = "black";
    ctx.fillText(this.text.substring(0, this.curr / 2), 100, 100);

    ctx.fillText(this.text2.substring(0, this.curr2 / 2), 100, 200);
  }

  update() {
    this.door.update();
    if (this.curr < this.text.length * 2) {
      this.curr = this.curr + 1;
    } else {
      if (this.curr2 < this.text2.length * 2) {
        this.curr2 = this.curr2 + 1;
      }
    }
  }
}
