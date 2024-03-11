"use strict";
import Player from "./Player.js";
import Level from "./Level.js";
import { SOUNDS } from "./constants.js";

export const gravity = 0.6;

export const platform = {
  x: 0,
  y: 0.65 * screen.height,
  width: screen.width,
  height: 0.35 * screen.height,
};

export let keys = {
  left: false,
  right: false,
  e: false,
};

export let click = {
  clicked: false,
  x: 0,
  y: 0,
};

export let ctx;
export let player;
let level;
let sprites;
let images = [];
let keyImg;
export let boyNpc;
export let rightNpc;
export let gift;

(function () {
  window.addEventListener("load", load_img);

  function load_img() {
    sprites = new Image();
    sprites.src = "./imgs/sprites.png";
    sprites.onload = () => {
      let img1 = new Image();
      img1.src = "./imgs/puzzle.png";
      images.push(img1);
      img1.onload = () => {
        let img2 = new Image();
        img2.src = "./imgs/puzzle2.png";
        images.push(img2);
        img2.onload = () => {
          keyImg = new Image();
          keyImg.src = "./imgs/key-blue.png";
          keyImg.onload = () => {
            boyNpc = new Image();
            boyNpc.src = "./imgs/boy-npc.png";
            boyNpc.onload = () => {
              rightNpc = new Image();
              rightNpc.src = "./imgs/right.png";
              rightNpc.onload = () => {
                gift = new Image();
                gift.src = "./imgs/gift.png";
                gift.onload = () => {
                  let img3 = new Image();
                  img3.src = "./imgs/puzzle3.png";
                  images.push(img3);
                  img3.onload = init;
                };
              };
            };
          };
        };
      };
    };
  }

  function init() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.height = screen.height;
    ctx.canvas.width = screen.width;

    player = new Player(sprites, keyImg);
    level = new Level(player, images);
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    document.addEventListener("click", onclick);

    // Adding the event listeners
    setInterval(loop, 22);
  }

  function loop() {
    level.update();
    level.render();

    player.update();
    player.render();
  }

  // This function will be called when a key on the keyboard is pressed
  function keydown(e) {
    // 37 is the code for the left arrow key
    if (e.keyCode == 65) {
      keys.left = true;
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 68) {
      keys.right = true;
    }

    if (e.keyCode == 69) {
      console.log("pressed e");
      keys.e = true;
    }

    if (e.keyCode == 70) {
      console.log("pressed f");
      keys.f = true;
    }

    if (e.keyCode == 32) {
      keys.space = true;
    }


    SOUNDS["bg"].play();
  }

  // This function is called when the pressed key is released
  function keyup(e) {
    if (e.keyCode == 65) {
      keys.left = false;
    }
    if (e.keyCode == 68) {
      keys.right = false;
    }
    // if (e.keyCode == 69) {
    //   keys.e = false;
    // }
  }

  function onclick(e) {
    click.clicked = true;
    click.x = e.clientX;
    click.y = e.clientY;

  }
})();
