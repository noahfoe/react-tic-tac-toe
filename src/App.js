import './App.css';
import {useState, useEffect} from 'react'
import Square from "./Components/Square";
import { WinCons } from './WinCons';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]) // 9 boxes (3x3 grid)
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner: "none", state: "none"});

  // Called every time the board is updated
  useEffect(() => {
    checkIfTie();
    checkWinCons();
    if(player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  // Called every time the result is updated
  useEffect(() => {
    if(result.state != "none") {
      alert(`Game Over: Winner is ${result.winner}`);
      restartGame();
    }
  }, [result]);

  // Decides which square the player selected and which player selected it 
  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
      if(idx == square && val == "") {
        return player;
      }
      return val;
    }));
  };

  // Checks if someone has won the game
  const checkWinCons = () => {
    WinCons.forEach((currWinCon) => {
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
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => {chooseSquare(0);}}/>
          <Square val={board[1]} chooseSquare={() => {chooseSquare(1);}}/>
          <Square val={board[2]} chooseSquare={() => {chooseSquare(2);}}/>
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => {chooseSquare(3);}}/>
          <Square val={board[4]} chooseSquare={() => {chooseSquare(4);}}/>
          <Square val={board[5]} chooseSquare={() => {chooseSquare(5);}}/>
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => {chooseSquare(6);}}/>
          <Square val={board[7]} chooseSquare={() => {chooseSquare(7);}}/>
          <Square val={board[8]} chooseSquare={() => {chooseSquare(8);}}/>
        </div>
      </div>
    </div>
  );
}

export default App;
