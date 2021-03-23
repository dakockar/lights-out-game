import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import './Board.css';
import Timer from "./Timer";

// game board

function Board(props) {

  // set initial state
  const [isWinner, setWinner] = useState(false);
  const [board, setBoard] = useState(createBoard());
  const [time, setTime] = useState(0);
  const [intervalId, setId] = useState(0);
  const [moves, setMoves] = useState(0);


  function resetGame() {
    clearInterval(intervalId);
    startTimer();

    setWinner(false);
    setBoard(createBoard());
    setMoves(0);
  }


  function startTimer() {
    setTime(0);

    let id = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    setId(id);
  }

  // create a rows X cols sized board, each tile randomly lit or unlit
  function createBoard() {
    let newBoard = [];

    // create the board with true or false values for each tile
    for (let y = 0; y < props.rows; y++) {
      let row = [];

      // create the individual rows of the board
      for (let x = 0; x < props.cols; x++) {
        row.push(Math.random() < props.litChance)
      }
      newBoard.push(row);
    }

    return newBoard;
  }


  // handle tile toggle, determine isWinner
  function toggleAdjacentTiles(coord) {
    let { cols, rows } = props;
    let [y, x] = coord.split("-").map(el => Number(el));
    let changedBoard = JSON.parse(JSON.stringify(board));
    let hasWon = false;
    // let [y, x] = coord.split("-").map(Number);

    function toggleTile(y, x) {
      // check if the given tile coord is on the board, if so, toggle the tile
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        changedBoard[y][x] = !changedBoard[y][x];
      }
    }

    toggleTile(y, x);
    toggleTile(y, x - 1);
    toggleTile(y, x + 1);
    toggleTile(y - 1, x);
    toggleTile(y + 1, x);

    hasWon = changedBoard.every(row => row.every(tile => !tile))

    setMoves(prevMoves => prevMoves + 1);
    setBoard(changedBoard);
    setWinner(hasWon);
  }

  // create the board to be displayed, as a table
  let displayedBoard = [];
  for (let y = 0; y < props.rows; y++) {
    let row = [];

    // create each tile and each row, 
    // get the isLit info from the board state
    for (let x = 0; x < props.cols; x++) {
      // give each tile a key in (y-x) format
      let coord = `${y}-${x}`
      row.push(
        <Tile
          key={coord}
          isLit={board[y][x]}
          toggleTiles={() => toggleAdjacentTiles(coord)} />
      )
    }

    // push each row to the table board, as a table row
    displayedBoard.push(<div className="Board-row" key={y}>{row}</div>)
  }

  useEffect(() => {
    startTimer();
  }, [])

  return (
    <div>
      {
        isWinner
          ? <div>
            {clearInterval(intervalId)}
            <h1 className="h1-glow">you win!</h1>
          </div>
          : <div>
            <h1 className="h1-glow">make it dark</h1>
            <div className="Board">
              {displayedBoard.map(row => row)}
            </div>
          </div>
      }
      <Timer time={time} />
      <div>Moves: {moves}</div>
      <button className="Board-button" onClick={resetGame}>restart</button>
    </div>
  )
}

Board.defaultProps = {
  rows: 5,
  cols: 5,
  litChance: 0.25
}


export default Board;
