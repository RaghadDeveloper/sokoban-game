import { Renderer } from "./renderer.js";
import { State } from "./state.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas, 32);
    this.levels = [];
    this.levelIndex = 0;
    this.state = null;
  }

  async init(levels) {
    this.levels = levels;
    if (this.levels.length > 0) {
      this.state = State.fromGrid(this.levels[this.levelIndex]);
      await this.renderer.loadImages();
      this.draw();
    }
  }

  draw() {
    if (this.state) {
      this.renderer.draw(this.state.grid);
    }
  }

  move(dx, dy) {
    if (!this.state) return;

    if (this.state.isPossibleMove(dx, dy)) {
      this.state.performMove(dx, dy, this.state.grid, true);
      this.draw();
      console.log(this.state.getNextStates());

      if (this.state.isSolved()) {
        setTimeout(() => {
          window.alert("You Win 🎉🎉");

          if (this.levelIndex < this.levels.length - 1) {
            this.nextLevel();
            this.draw();
          }
        }, 100);
      }
    }
  }

  nextLevel() {
    if (this.levelIndex < this.levels.length - 1) {
      this.levelIndex = this.levelIndex + 1;
      this.state = State.fromGrid(this.levels[this.levelIndex]);
      this.draw();
    }
  }

  setLevel(levelIndex) {
    if (levelIndex >= 0 && levelIndex < this.levels.length) {
      this.levelIndex = levelIndex;
      this.state = State.fromGrid(this.levels[this.levelIndex]);
      this.draw();
    }
  }
}
