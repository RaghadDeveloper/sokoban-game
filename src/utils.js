export function cloneGrid(g) {
  return g?.map((r) => [...r]);
}

export function getDirections(states) {
  const directions = [];

  for (let i = 1; i < states.length; i++) {
    const prev = states[i - 1];
    const curr = states[i];

    const dx = curr.playerX - prev.playerX;
    const dy = curr.playerY - prev.playerY;

    if (dx === -1 && dy === 0) directions.push("left");
    else if (dx === 1 && dy === 0) directions.push("right");
    else if (dx === 0 && dy === -1) directions.push("up");
    else if (dx === 0 && dy === 1) directions.push("down");
  }

  return directions;
}
