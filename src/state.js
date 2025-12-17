import { cloneGrid } from "./utils.js";
import { sympols } from "./constants.js";
const { wall, floor, player, box, goal, boxOnGoal, playerOnGoal } = sympols;

export class State {
  constructor(grid, playerX, playerY) {
    this.grid = grid;
    this.playerX = playerX;
    this.playerY = playerY;
    this.allNextState = [];
  }

  static fromGrid(grid) {
    let px, py;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === player || grid[y][x] === playerOnGoal) {
          px = x;
          py = y;
        }
      }
    }

    return new State(cloneGrid(grid), px, py);
  }

  isPossibleMove(dx, dy) {
    const newX = this.playerX + dx;
    const newY = this.playerY + dy;

    if (newY < 0 || newY >= this.grid.length) return false;
    if (newX < 0 || newX >= this.grid[newY].length) return false;

    const playerNewPlace = this.grid[newY][newX];

    if (playerNewPlace === wall) return false;

    if (playerNewPlace === box || playerNewPlace === boxOnGoal) {
      const nextToNewPlaceX = newX + dx;
      const nextToNewPlaceY = newY + dy;

      if (nextToNewPlaceY < 0 || nextToNewPlaceY >= this.grid.length)
        return false;
      if (
        nextToNewPlaceX < 0 ||
        nextToNewPlaceX >= this.grid[nextToNewPlaceY].length
      )
        return false;

      const nextToNewPlace = this.grid[nextToNewPlaceY][nextToNewPlaceX];

      if (
        nextToNewPlace === wall ||
        nextToNewPlace === box ||
        nextToNewPlace === boxOnGoal
      )
        return false;
    }

    return true;
  }

  performMove(dx, dy, gridState, doApply = false) {
    const newX = this.playerX + dx;
    const newY = this.playerY + dy;

    const playerNewPlace = gridState[newY][newX];
    const nextToNewPlace = gridState[newY + dy][newX + dx];

    gridState[this.playerY][this.playerX] =
      gridState[this.playerY][this.playerX] === playerOnGoal ? goal : floor;

    if (playerNewPlace === floor) {
      gridState[newY][newX] = player;
    } else if (playerNewPlace === box || playerNewPlace === boxOnGoal) {
      gridState[newY + dy][newX + dx] =
        nextToNewPlace === goal ? boxOnGoal : box;

      gridState[newY][newX] =
        playerNewPlace === boxOnGoal ? playerOnGoal : player;
    } else if (playerNewPlace === goal) {
      gridState[newY][newX] = playerOnGoal;
    }

    if (doApply) {
      this.playerX = newX;
      this.playerY = newY;
    }

    return gridState;
  }

  isSolved() {
    for (let row of this.grid) {
      if (row.includes(goal) || row.includes(playerOnGoal)) return false;
    }
    return true;
  }

  getNextStates() {
    const moves = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
    ];

    const results = [];

    for (const { dx, dy } of moves) {
      if (this.isPossibleMove(dx, dy)) {
        const newGrid = this.performMove(dx, dy, cloneGrid(this.grid), false);

        const nextState = new State(
          cloneGrid(newGrid),
          this.playerX + dx,
          this.playerY + dy
        );

        results.push(nextState);
      }
    }

    return results;
  }

  hash() {
    return (
      this.grid.map((row) => row.join("")).join("") +
      "|" +
      this.playerX +
      "," +
      this.playerY
    );
  }
  getBoxes() {
    const boxes = [];

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === box) {
          boxes.push({ x, y });
        }
      }
    }

    return boxes;
  }

  getGoals() {
    const goals = [];

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === goal) {
          goals.push({ x, y });
        }
      }
    }

    return goals;
  }
}
