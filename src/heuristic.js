export function heuristic(state) {
  const boxes = state.getBoxes();
  const goals = state.getGoals();

  let h = 0;

  for (const box of boxes) {
    let minDist = Infinity;

    for (const goal of goals) {
      const dist = Math.abs(box.x - goal.x) + Math.abs(box.y - goal.y);

      minDist = Math.min(minDist, dist);
    }

    h += minDist;
  }

  return h;
}

export function solveHeuristic(initialState) {
  const visited = new Set();

  function dfs(state, path) {
    const hash = state.hash();

    if (visited.has(hash)) return null;
    visited.add(hash);

    if (state.isSolved()) {
      return [...path, state];
    }

    let nextStates = state.getNextStates();

    nextStates.sort((a, b) => heuristic(a) - heuristic(b));

    for (const next of nextStates) {
      const result = dfs(next, [...path, state]);
      if (result) return result;
    }

    return null;
  }

  return dfs(initialState, []);
}
