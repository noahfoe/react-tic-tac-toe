import './App.css';
import {useState, useEffect} from 'react'
import Square from "./Components/Square";
import getWinCons from './WinCons';

let playingBoard = [];
let newPlayingBoard = [];
let newWinCons = [];
let newPlayer;
function App() { 
  // Creates a blank array of size "num" for the playing board
  const chooseBoardSize = (num) => {
    let board = [];
    for(let i = 0; i<num; i++) {
      board.push("");
    }
    return board;
  }

  if(playingBoard.length == 0) {
    playingBoard = chooseBoardSize(9); // Default to 3x3 board
  }
  
  let WinCons = getWinCons(playingBoard);

  const [winCons, setWinCons] = useState(WinCons);
  const [board, setBoard] = useState(playingBoard);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner: "none", state: "none"});
  const [activeSquareColor, setActiveSquareColor] = useState('#64f4c4');
  const [boardColor, setBoardColor] = useState('#7fffd4');
  const [xColor, setXColor] = useState('#ff0000');
  const [oColor, setOColor] = useState('#0000ff');

  const gameOverElement = document.getElementById('gameOver');
  const winningMessageElement = document.querySelector('[data-winning-message]');
  
  const rows =  Array.from({length: Math.sqrt(board.length)});

  // Called every time the board is updated
  useEffect(() => {
    checkIfTie();
    checkWinCons();
    // Ensure that X starts first if board size has been changed
    if(newPlayer == "O") {
      setPlayer("X");
      newPlayer = "";
    } else if(newPlayer == "X") {
      setPlayer("X");
      newPlayer = "";
      // Otherwise, Ensure it is next players turn
    } else {
      if(player == "X") {
        setPlayer("O");
      } else {
        setPlayer("X");
      }
    }
  }, [board]);

  // Called every time the result is updated
  useEffect(() => {
    if(result.state != "none") {
      if(result.winner == "No One") {
        winningMessageElement.innerText = "Tie!";
      } else {
        winningMessageElement.innerText = `${result.winner} Wins!`
      }
      gameOverElement.classList.add('show');
    }
  }, [result]);

  // Decides which square the player selected and which player selected it 
  const chooseSquare = (square) => {
    if(board[square] != "X" && board[square] != "O") {
      setBoard(board.map((val, idx) => {
        if(idx == square && val == "") {
          return player;
        }
        return val;
      }));
    }
  };

  // Checks if someone has won the game
  const checkWinCons = () => {
    winCons.forEach((currWinCon) => {
      const firstPlayer = board[currWinCon[0]];
      if(firstPlayer == "") return;
      let foundWinCon = true;
      currWinCon.forEach((idx) => {
        if(board[idx] != firstPlayer) {
          foundWinCon = false;
        }
      });
      if(foundWinCon) {
        setResult({winner: player, state: "GameWon"});
      }
    });
  };

  // Checks if there has been a tie in the game
  const checkIfTie = () => {
    let tie = true;
    board.forEach((square) => {
      if(square == "") {
        tie = false;
      }
    });
    if(tie) {
      setResult({winner: "No One", state: "Tie"});
    }
  };

  const restartGame = () => {
    if(newPlayingBoard.length == 0) {
      setBoard(playingBoard);
    } else {
      setBoard(newPlayingBoard);
    }
    setPlayer("O");
    gameOverElement.classList.remove('show');
  };

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    newPlayingBoard = chooseBoardSize(parseInt(value));
    newPlayer = player;
    setBoard(newPlayingBoard);
    newWinCons = getWinCons(newPlayingBoard);
    setWinCons(newWinCons);
  };

  return (
    <div className="App">
    <div className="title">Ultimate Tic-Tac-Toe</div>
      <div className="radioButtons">
        <input type="radio" value="9" defaultChecked name="boardSize" onChange={val => onChangeValue(val)}/> 3x3
        <input type="radio" value="16" name="boardSize" onChange={val => onChangeValue(val)}/> 4x4
        <input type="radio" value="25" name="boardSize" onChange={val => onChangeValue(val)}/> 5x5
        <input type="radio" value="36" name="boardSize" onChange={val => onChangeValue(val)}/> 6x6
      </div>
      <div className="currPlayer">Current Player is: '{player}'</div>
      <div className="board" id="board" style={{ backgroundColor: boardColor }}>
          {rows.map((row, y) => (
            <div key={y} className="row">
              {board.slice(y * rows.length, y * rows.length + rows.length).map((square, x) => {
                const index = y * rows.length + x;
                return (
                  <Square key={index} val={board[index]} chooseSquare={() => {chooseSquare(index);}} colors={{ 'X': xColor, 'O': oColor }} activeColor={activeSquareColor} />
                );
              })}
            </div>
          ))}
      </div>
      <div className="colorInputs">
        <label>Board: <input type="color" value={boardColor} onChange={e => setBoardColor(e.target.value)} /></label>
        <label>Active Square: <input type="color" value={activeSquareColor} onChange={e => setActiveSquareColor(e.target.value)} /></label>
        <label>X: <input type="color" value={xColor} onChange={e => setXColor(e.target.value)} /></label>
        <label>O: <input type="color" value={oColor} onChange={e => setOColor(e.target.value)} /></label>
      </div>
      <div className="winning-message" id="gameOver">
        <div data-winning-message></div>
        <button onClick={restartGame} id="restartButton">Restart</button>
      </div>
    </div>
  );
}

export default App;
