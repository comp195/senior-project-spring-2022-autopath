// Bikram Chatterjee
// AutoPath
// breadthFirstSearch.js

export function breadthFirstSearch(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode)  return false;
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode === endNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    let unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (let unvisitedNeighbour of unvisitedNeighbors) {
      unvisitedNeighbour.previousNode = closestNode;
      if (neighborNotInUnvisitedNodes(unvisitedNeighbour, unvisitedNodes)) unvisitedNodes.push(unvisitedNeighbour);
    }
  }
  return visitedNodesInOrder;
}

function neighborNotInUnvisitedNodes(neighbor, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbor.row && node.col === neighbor.col) return false;
  }
  return true;
}

function getUnvisitedNeighbors(node, grid) {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

export function getNodesInShortestPathOrderBFS(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
