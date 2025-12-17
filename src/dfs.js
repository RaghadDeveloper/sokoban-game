export function solveDFS(initialState) {
  const visited = new Set();

  function dfs(state, path) {
    const h = state.hash();

    if (visited.has(h)) return null;
    visited.add(h);

    if (state.isSolved()) {
      return [...path, state];
    }

    const nextStates = state.getNextStates();

    for (const next of nextStates) {
      const result = dfs(next, [...path, state]);
      if (result) return result;
    }

    return null;
  }

  return dfs(initialState, []);
}
