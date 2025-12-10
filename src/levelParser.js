import { sympols } from "./constants.js";
const { wall, floor, player, box, goal, boxOnGoal, playerOnGoal } = sympols;

const charToSymbol = {
  W: wall,
  E: floor,
  P: player,
  B: box,
  b: boxOnGoal,
  p: playerOnGoal,
  e: goal,
};

export function parseLevelText(text) {
  const levels = [];
  const blocks = text.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");

    const [hStr, wStr] = lines[0].trim().split(/\s+/);
    const height = parseInt(hStr, 10);
    const width = parseInt(wStr, 10);

    const grid = [];

    for (let r = 1; r <= height; r++) {
      const rowText = lines[r]?.trim() ?? "";
      const row = [];

      for (let c = 0; c < width; c++) {
        const ch = rowText[c] || "E";
        row.push(charToSymbol[ch] ?? undefined);
      }

      grid.push(row);
    }

    levels.push(grid);
  }

  return levels;
}
