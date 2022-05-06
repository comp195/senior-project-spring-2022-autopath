// Bikram Chatterjee
// AutoPath
// randomMaze.js

export function randomMaze(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let walls = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (
        (row === startNode.row && col === startNode.col) ||
        (row === endNode.row && col === endNode.col)
      )
        continue;
      if (Math.random() < 0.33) {
        walls.push([row, col]);
      }
    }
  }
  walls.sort(() => Math.random() - 0.5);
  return walls;
}
