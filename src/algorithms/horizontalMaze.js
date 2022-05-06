// Bikram Chatterjee
// AutoPath
// horizontalMaze.js

let walls;
export function horizontalMaze(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let horizRange = range(grid.length);
  let vertRange = range(grid[0].length);
  walls = [];
  getHorizontalWalls(vertRange, horizRange, startNode, endNode);
  return walls;
}

function addWall(num, vertList, startNode, endNode) {
  let isGridStatusOn = false;
  let wallList = [];

  for (let vertCol of vertList) {
    if ((num === startNode.row && vertCol === startNode.col) || (num === endNode.row && vertCol === endNode.col)) {
      isGridStatusOn = true;
      continue;
    }
    wallList.push([num, vertCol]);
  }

  if (!isGridStatusOn) wallList.splice(Math.floor(Math.random() * wallList.length), 1);
  for (let wall of wallList) walls.push(wall);
}

function getHorizontalWalls(vertList, horizList, startNode, endNode) {
  if (horizList.length < 2) return;
  
  let randNum = Math.floor(Math.random() * 2);
  for (let num of horizList) {
    if (randNum === 0 && num % 2 !== 0) addWall(num, vertList, startNode, endNode);
    if (randNum === 1 && num % 2 === 0) addWall(num, vertList, startNode, endNode);
  }
}

function range(max) {
  let result = [];
  for (let i = 0; i < max; i++)  result.push(i);
  return result;
}
