import { Game } from "./game.js";
import { loadLevels } from "./levels.js";

const canvas = document.getElementById("gameCanvas");
const levelButtonsContainer = document.getElementById("levelButtons");
const game = new Game(canvas);

document.getElementById("dfsBtn").addEventListener("click", () => {
  game.solveWithDFS();
});

async function initializeGame() {
  try {
    const levels = await loadLevels();

    levels.forEach((_, index) => {
      const btn = document.createElement("button");
      btn.textContent = index + 1;
      btn.addEventListener("click", () => {
        game.setLevel(index);
      });
      levelButtonsContainer.appendChild(btn);
    });

    await game.init(levels);

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") game.move(-1, 0);
      if (e.key === "ArrowRight") game.move(1, 0);
      if (e.key === "ArrowUp") game.move(0, -1);
      if (e.key === "ArrowDown") game.move(0, 1);
    });
  } catch (error) {
    console.error("Failed to initialize game:", error);
  }
}

initializeGame();
