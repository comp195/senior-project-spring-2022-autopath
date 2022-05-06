// Bikram Chatterjee
// AutoPath
// dijkstra.js

export function dijkstra(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  startNode.distance = 0;
  let unvisitedNodes = getNodes(grid);
  let visitedNodesInOrder = [];
  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === endNode) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbors(node, grid) {
  let unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (let unvisitedNeighbour of unvisitedNeighbors) {
    unvisitedNeighbour.distance = node.distance + 1;
    unvisitedNeighbour.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  let { row, col } = node;
  if (row !== 0) neighbors.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col !== 0) neighbors.push(grid[row][col - 1]);
  return neighbors
    .filter((neighbor) => !neighbor.isWall)
    .filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrderDijkstra(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}