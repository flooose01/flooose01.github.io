import Door from "./Door.js";
import { ctx, boyNpc, keys, rightNpc, gift, click } from "./index.js";
import { SOUNDS } from "./constants.js";
export default class FinalLevel {
  constructor(player) {
    this.done = true;

    this.door = new Door();
    this.player = player;
    this.finalScene = false;

    let delay = "                     ";
    this.texts = [
      "Happy 21st Birthday, Chella" + delay,
      "Semoga kuliah lancar dan bisa have fun" + delay,
      "Sekarang udah tua, semoga bisa makin dewasa dan plus plus" + delay,
      "Thank you for always being there!" + delay,
      "Hopefully, you like the little game." + delay,
      "Honestly, I've been really really busy and stressed" + delay,
      "And you really really help me unstress :)" + delay,
      "Sorry, I can't make a full game!" + delay,
      "I love you <3" + delay + "                 ",
      "You obtained an item!" + delay,
    ];
    this.currT = 0;
    this.curr = 0;

    this.fs2 = false;
    this.fs3 = false;
  }

  render() {
    if (this.fs3) {
      ctx.drawImage(boyNpc, 200, 0.65 * screen.height - 250);
      ctx.font = "30px pixel";
      ctx.fillStyle = "black";

      ctx.fillText("ACTUAL GIFT COMING SOON", 100, 100);

      ctx.fillText("from yours truly, Darel", 100, 200);

      ctx.fillText("and ur bestie, JS", 100, 300);
    } else {
      if (this.fs2) {
        ctx.drawImage(boyNpc, 200, 0.65 * screen.height - 250);
        ctx.drawImage(gift, this.player.x - 50, this.player.y - 200);
      } else {
        if (this.finalScene) {
          ctx.drawImage(rightNpc, 365, 0.65 * screen.height - 100);

          ctx.font = "20px pixel";
          ctx.fillStyle = "black";

          ctx.fillText(
            this.texts[this.currT].substring(0, this.curr / 2),
            100,
            100
          );
        } else {
          ctx.drawImage(boyNpc, 200, 0.65 * screen.height - 250);
          this.door.render();

          if (this.player.x < 200 + 400 && this.player.x > 200) {
            ctx.font = "10px pixel";
            ctx.fillText("press f to", 250, 0.65 * screen.height - 100 - 20);
            ctx.fillText("talk", 250, 0.65 * screen.height - 100 - 8);
          }
        }
      }
    }
  }

  update() {
    if (this.fs3) {
    } else {
      if (this.fs2) {
        if (click.clicked) {
          if (
            click.x < this.player.x - 50 + 200 &&
            click.x > this.player.x - 50 &&
            click.y > this.player.y - 200 &&
            click.y < this.player.y - 200 + 200
          ) {
            SOUNDS["unbox"].play();
            click.clicked = false;
            this.fs2 = false;
            this.fs3 = true;
          }
        }
      } else {
        if (this.finalScene) {
          if (this.curr < this.texts[this.currT].length * 2) {
            this.curr++;
          } else if (this.curr == this.texts[this.currT].length * 2) {
            if (this.currT + 1 < this.texts.length) {
              this.curr = 0;
              this.currT++;
            } else {
              this.fs2 = true;
              this.finalScene = false;
              SOUNDS["gift"].play();
            }
          }
        } else if (!this.finalScene) {
          this.door.update();
          if (keys.f) {
            if (this.player.x < 200 + 400 && this.player.x > 200) {
              this.finalScene = true;
            }
            keys.f = false;
          }
        }
      }
    }
  }

  // Variables for heart animation
  // let progress = 0;
  // const animationDuration = 1000; // in milliseconds

  // // Heart shape drawing function
  //  drawHeart() {
  //   ctx.beginPath();
  //   ctx.moveTo(canvas.width / 2, canvas.height / 4);
  //   ctx.bezierCurveTo(
  //     canvas.width / 2, 0,
  //     0, 0,
  //     0, canvas.height / 4
  //   );
  //   ctx.bezierCurveTo(
  //     0, canvas.height * 2 / 3,
  //     canvas.width / 2, canvas.height * 3 / 4,
  //     canvas.width / 2, canvas.height
  //   );
  //   ctx.bezierCurveTo(
  //     canvas.width / 2, canvas.height * 3 / 4,
  //     canvas.width, canvas.height * 2 / 3,
  //     canvas.width, canvas.height / 4
  //   );
  //   ctx.bezierCurveTo(
  //     canvas.width, 0,
  //     canvas.width / 2, 0,
  //     canvas.width / 2, canvas.height / 4
  //   );
  //   ctx.closePath();
  // }
}
