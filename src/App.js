import './App.css';
import {useState, useEffect} from 'react'
import Square from "./Components/Square";
import { WinCons } from './WinCons';

function App() {
  /*
  let playingBoard = [];
  const chooseBoardSize = (num) => {
    let board = [];
    for(let i = 0; i<num; i++) {
      board.push("");
    }
    console.log(board);
    return board;
  }

  playingBoard = chooseBoardSize(9);
  const squareRoot = Math.sqrt(playingBoard.length);
  */

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]); // 16 boxes (4x4 grid)
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
    setBoard(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]);
    setPlayer("O");
  };


  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => {chooseSquare(0);}}/>
          <Square val={board[1]} chooseSquare={() => {chooseSquare(1);}}/>
          <Square val={board[2]} chooseSquare={() => {chooseSquare(2);}}/>
          <Square val={board[3]} chooseSquare={() => {chooseSquare(3);}}/>
        </div>
        <div className="row">
          <Square val={board[4]} chooseSquare={() => {chooseSquare(4);}}/>
          <Square val={board[5]} chooseSquare={() => {chooseSquare(5);}}/>
          <Square val={board[6]} chooseSquare={() => {chooseSquare(6);}}/>
          <Square val={board[7]} chooseSquare={() => {chooseSquare(7);}}/>
        </div>
        <div className="row">
          <Square val={board[8]} chooseSquare={() => {chooseSquare(8);}}/>
          <Square val={board[9]} chooseSquare={() => {chooseSquare(9);}}/>
          <Square val={board[10]} chooseSquare={() => {chooseSquare(10);}}/>
          <Square val={board[11]} chooseSquare={() => {chooseSquare(11);}}/>
        </div>
        <div className="row">
          <Square val={board[12]} chooseSquare={() => {chooseSquare(12);}}/>
          <Square val={board[13]} chooseSquare={() => {chooseSquare(13);}}/>
          <Square val={board[14]} chooseSquare={() => {chooseSquare(14);}}/>
          <Square val={board[15]} chooseSquare={() => {chooseSquare(15);}}/>
        </div>
      </div>
    </div>
  );
}

//export const playingBoard = playingBoard;
export default App;
