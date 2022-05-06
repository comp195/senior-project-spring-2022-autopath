import React, { Component } from "react";
import "./menubar.css";
import logo from '../images/logo.png';

class Menubar extends Component {
  state = {
    algorithm: "Visualize Algorithm",
    maze: "Generate Maze",
    pathState: false,
    mazeState: false,
    speedState: "Speed",
  };

  selectAlgorithm(selection) {
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (selection === this.state.algorithm || this.state.algorithm === "Visualize Algorithm" || this.state.algorithm === "Select an Algorithm!") 
    {
      this.setState({ algorithm: selection });
    } 
    
    else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    } 
    
    else {
      this.setState({ algorithm: selection });
    }
  }

  selectMaze(selection) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (
      selection === this.state.maze ||
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: selection });
    } else if (!this.state.mazeState) {
      this.setState({ maze: selection });
    } else {
      this.clearGrid();
      this.setState({ maze: selection });
    }
  }

  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.pathState) {
      this.clearTemp();
      return;
    }
    if (
      this.state.algorithm === "Visualize Algorithm" || this.state.algorithm === "Select an Algorithm!") {
      this.setState({ algorithm: "Select an Algorithm!" });
    } 
    
    else {
      this.setState({ pathState: true });
      if (this.state.algorithm === "Visualize Dijkstra")
        this.props.visualizeDijkstra();
      else if (this.state.algorithm === "Visualize A*")
        this.props.visualizeAStar();
      else if (this.state.algorithm === "Visualize Greedy BFS")
        this.props.visualizeGreedyBFS();
      else if (this.state.algorithm === "Visualize Bidirectional Greedy")
        this.props.visualizeBidirectionalGreedySearch();
      else if (this.state.algorithm === "Visualize Breadth First Search")
        this.props.visualizeBFS();
      else if (this.state.algorithm === "Visualize Depth First Search")
        this.props.visualizeDFS();
    }
  }

  generateMaze() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;
    if (this.state.mazeState || this.state.pathState) this.clearTemp();
    if (this.state.maze === "Generate Maze" || this.state.maze === "Select a Maze!") this.setState({ maze: "Select a Maze!" });
    else {
      this.setState({ mazeState: true });
      if (this.state.maze === "Generate Horizontal Maze") this.props.generateHorizontalMaze();
      else if (this.state.maze === "Generate Vertical Maze") this.props.generateVerticalMaze();
      else if (this.state.maze === "Generate Recursive Maze") this.props.generateRecursiveDivisionMaze();
      else if (this.state.maze === "Generate Random Maze") this.props.generateRandomMaze();
    }
  }

  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;
    this.props.clearGrid();
    this.setState({
      algorithm: "Visualize Algorithm",
      maze: "Generate Maze",
      pathState: false,
      mazeState: false,
    });
  }

  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  changeSpeed(speed) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) return;
    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed === "Normal") value = [25, 20];
    else if (speed === "Fast") value = [10, 10];
    this.setState({ speedState: speed });
    this.props.updateSpeed(value[0], value[1]);
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand h1 mb-0">
          <img src={logo} height={38}/>
        </div>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mazes
                </button>
                
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Horizontal Maze")}
                  >
                    Horizontal Division Maze
                  </button>

                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Vertical Maze")}
                  >
                    Vertical Division Maze
                  </button>

                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Recursive Maze")}
                  >
                    Recursive Division Maze
                  </button>

                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Random Maze")}
                  >
                    Random Maze
                  </button>

                </div>
              </div>{" "}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.generateMaze()}
              >
                {this.state.maze}
              </button>
            </li>

            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Algorithms
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize Dijkstra")}
                  >
                    Dijkstra's Algorithm
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize A*")}
                  >
                    A* Algorithm
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize Greedy BFS")}
                  >
                    Greedy Best First Search
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Bidirectional Greedy")
                    }
                  >
                    Bidirectional Greedy Search
                  </button>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Breadth First Search")
                    }
                  >
                    Breadth First Search
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Depth First Search")
                    }
                  >
                    Depth First Search
                  </button>
                </div>
              </div>{" "}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.visualizeAlgorithm()}
              >
                {this.state.algorithm}
              </button>
            </li>
            
            <li>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.clearGrid()}
              >
                Clear All
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.speedState}
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Slow")}
                  >
                    Slow
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Normal")}
                  >
                    Normal
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Fast")}
                  >
                    Fast
                  </button>
                </div>
              </div>{" "}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Menubar;

