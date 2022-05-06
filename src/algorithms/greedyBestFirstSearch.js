// Bikram Chatterjee
// AutoPath
// greedyBestFirstSearch.js

export function greedyBFS(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];
  startNode.distance = 0;
  unvisitedNodes.push(startNode);

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode === endNode) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    let neighbors = getNeighbors(closestNode, grid);
    for (let neighbor of neighbors) {
      let distance = closestNode.distance + 1;
      if (neighborNotInUnvisitedNodes(neighbor, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbor);
        neighbor.distance = distance;
        neighbor.totalDistance = getDistance(neighbor, endNode);
        neighbor.previousNode = closestNode;
      } else if (distance < neighbor.distance) {
        neighbor.distance = distance;
        neighbor.totalDistance = getDistance(neighbor, endNode);
        neighbor.previousNode = closestNode;
      }
    }
  }
  return visitedNodesInOrder;
}

function getDistance(node, nodeTwo) {
  return Math.abs(node.row - nodeTwo.row) + Math.abs(node.col - nodeTwo.col);
}

function getNeighbors(node, grid) {
  let neighbors = [];
  let {
    row,
    col
  } = node;
  if (row !== 0) neighbors.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col !== 0) neighbors.push(grid[row][col - 1]);
  return neighbors.filter(
    (neighbor) => !neighbor.isWall && !neighbor.isVisited
  );
}

function neighborNotInUnvisitedNodes(neighbor, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbor.row && node.col === neighbor.col) {
      return false;
    }
  }
  return true;
}

export function getNodesInShortestPathOrderGreedyBFS(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}