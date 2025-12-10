import { imageSources } from "./constants.js";

export class Renderer {
  constructor(canvas, tileSize = 32) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.tileSize = tileSize;
    this.images = {};
  }

  async loadImages() {
    const entries = Object.entries(imageSources);
    const promises = entries.map(
      ([key, src]) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve({ key, img });
        })
    );

    const results = await Promise.all(promises);
    results.forEach(({ key, img }) => (this.images[key] = img));
  }

  draw(grid) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const tile = grid[y][x];
        const img = this.images[tile];
        if (img)
          ctx.drawImage(
            img,
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
      }
    }
  }
}
