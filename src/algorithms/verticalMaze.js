// Bikram Chatterjee
// AutoPath
// verticalMaze.js

let walls;
export function verticalMaze(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) return false;
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  getVerticalWalls(vertical, horizontal, startNode, endNode);
  return walls;
}

function addWall(num, horizList, startNode, finishNode) {
  let isGridStatusOn = false;
  let wallList = [];

  for (let horizRow of horizList) {
    if ((horizRow === startNode.row && num === startNode.col) || (horizRow === finishNode.row && num === finishNode.col)) {
      isGridStatusOn = true;
      continue;
    }
    wallList.push([horizRow, num]);
  }
  if (!isGridStatusOn)  wallList.splice(Math.floor(Math.random() * wallList.length), 1);
  for (let wall of wallList)  walls.push(wall);
}

function getVerticalWalls(vertList, horizontal, startNode, finishNode) {
  if (vertList.length < 2)   return;
  let choice = Math.floor(Math.random() * 2);
  for (let num of vertList) {
    if (choice === 0 && num % 2 !== 0)  addWall(num, horizontal, startNode, finishNode);
    if (choice === 1 && num % 2 === 0) addWall(num, horizontal, startNode, finishNode);
  }
}

function range(max) {
  let result = [];
  for (let i = 0; i < max; i++) result.push(i);
  return result;
}
