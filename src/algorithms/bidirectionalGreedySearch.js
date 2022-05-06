// Bikram Chatterjee
// AutoPath
// bidirectionalGreedySearch.js

export function bidirectionalGreedySearch(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let unvisitedStartNodeList = [];
  let visitedNodesInOrderStart = [];
  let unvisitedNodesFinish = [];
  let visitedNodesInOrderFinish = [];
  startNode.distance = 0;
  endNode.distance = 0;
  unvisitedStartNodeList.push(startNode);
  unvisitedNodesFinish.push(endNode);

  while (unvisitedStartNodeList.length !== 0 && unvisitedNodesFinish.length !== 0) {
    
    unvisitedStartNodeList.sort((a, b) => a.totalDistance - b.totalDistance);
    unvisitedNodesFinish.sort((a, b) => a.totalDistance - b.totalDistance);
    let closestNodeStart = unvisitedStartNodeList.shift();
    let closestNodeFinish = unvisitedNodesFinish.shift();

    closestNodeStart.isVisited = true;
    closestNodeFinish.isVisited = true;
    visitedNodesInOrderStart.push(closestNodeStart);
    visitedNodesInOrderFinish.push(closestNodeFinish);
    if (isNeighbor(closestNodeStart, closestNodeFinish)) return [visitedNodesInOrderStart, visitedNodesInOrderFinish, true];
    
    let neighbourList = getNeighborList(closestNodeStart, grid);
    for (let neighbour of neighbourList) {
      if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesFinish)) {
        visitedNodesInOrderStart.push(closestNodeStart);
        visitedNodesInOrderFinish.push(neighbour);
        return [visitedNodesInOrderStart, visitedNodesInOrderFinish, true];
      }
      let distance = closestNodeStart.distance + 1;
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedStartNodeList)) {
        unvisitedStartNodeList.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = getDistance(neighbour, endNode);
        neighbour.previousNode = closestNodeStart;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = getDistance(neighbour, endNode);
        neighbour.previousNode = closestNodeStart;
      }
    }

    neighbourList = getNeighborList(closestNodeFinish, grid);
    for (let neighbour of neighbourList) {
      if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedStartNodeList)) {
        visitedNodesInOrderStart.push(closestNodeFinish);
        visitedNodesInOrderStart.push(neighbour);
        return [visitedNodesInOrderStart, visitedNodesInOrderFinish, true];
      }
      let distance = closestNodeFinish.distance + 1;
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesFinish)) {
        unvisitedNodesFinish.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = getDistance(neighbour, startNode);
        neighbour.previousNode = closestNodeFinish;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = getDistance(neighbour, startNode);
        neighbour.previousNode = closestNodeFinish;
      }
    }
  }
  return [visitedNodesInOrderStart, visitedNodesInOrderFinish, false];
}

function getDistance(nodeA, nodeB) {
  let x = Math.abs(nodeA.row - nodeB.row);
  let y = Math.abs(nodeA.col - nodeB.col);
  return x + y;
}

function isNeighbor(startNode, endNode) {
  let sRow = startNode.row;
  let sCol = startNode.col;
  let fRow = endNode.row;
  let fCol = endNode.col;
  if (fRow === sRow - 1 && fCol === sCol) return true;
  if (fRow === sRow && fCol === sCol + 1) return true;
  if (fRow === sRow + 1 && fCol === sCol) return true;
  if (fRow === sRow && fCol === sCol - 1) return true;
  return false;
}

function getNeighborList(node, grid) {
  let neighbours = [];
  let {
    row,
    col
  } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours.filter(
    (neighbour) => !neighbour.isWall && !neighbour.isVisited
  );
}


function neighbourNotInUnvisitedNodes(neighbor, unvisitedNodes) {
  for (let node of unvisitedNodes) {
    if (node.row === neighbor.row && node.col === neighbor.col) {
      return false;
    }
  }
  return true;
}

export function getNodesInShortestPathOrderBidirectionalGreedySearch(nodeA, nodeB) {
  let nodesInShortestPathOrder = [];
  let currentNode = nodeB;
  while (currentNode !== null) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  currentNode = nodeA;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}