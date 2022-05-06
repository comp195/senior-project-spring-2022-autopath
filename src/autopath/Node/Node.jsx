import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      isVisited,
      isShortest,
      onMouseEnter,
      onMouseDown,
      onMouseUp,
      width,
      height,
      numRows,
      numColumns,
    } = this.props;

    const nodeStatus = isStart ? "node node-start" : isFinish ? "node node-finish" : isWall ? "node-wall" : isShortest ? "node node-shortest-path" : isVisited ? "node node-visited" : "node";

    let cWidth = Math.floor((width - 15) / numColumns);
    let cHeight;
    if (width > 1500) {
      cHeight = Math.floor((height - 70) / numRows);
    } else if (width > 1000) {
      cHeight = Math.floor((height - 70) / numRows);
    } else if (width > 500) {
      cHeight = Math.floor((height - 60) / numRows);
    } else if (width > 0) {
      cHeight = Math.floor((height - 50) / numRows);
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${nodeStatus}`}
        style={{ "--width": `${cWidth}px`, "--height": `${cHeight}px` }}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;

