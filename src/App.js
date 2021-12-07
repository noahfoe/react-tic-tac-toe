import './App.css';
import React, {useState, useEffect} from 'react'
import Square from "./Components/Square";
import getWinCons from './WinCons';
import Sound from 'react-sound';
import click from './Sounds/click.mp3';
import gameOver from './Sounds/gameover.mp3';

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
  
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);

  const [result, setResult] = useState({winner: "none", state: "none"});

  const [activeSquareColor, setActiveSquareColor] = useState('#64f4c4');
  const [boardColor, setBoardColor] = useState('#7fffd4');
  const [xColor, setXColor] = useState('#ff0000');
  const [oColor, setOColor] = useState('#0000ff');
  const [yColor, setYColor] = useState('#00ff11');
  const [zColor, setZColor] = useState('#87217a');
  const [currBoardSize, setCurrBoardSize] = useState(9)
  const [isPlayingClick, setIsPlayingClick] = useState(false);
  const [isPlayingGameOver, setIsPlayingGameOver] = useState(false);

  const gameOverElement = document.getElementById('gameOver');
  const winningMessageElement = document.querySelector('[data-winning-message]');
  
  const rows =  Array.from({length: Math.sqrt(board.length)});

  // Called every time the board is updated
  useEffect(() => {
    checkIfTie();
    checkWinCons();
    // Ensure that X starts first if board size has been changed
    if(newPlayer === "O" && numberOfPlayers === 2) {
      setPlayer("X");
      newPlayer = "";
    } else if(newPlayer === "X" && numberOfPlayers === 2) {
      setPlayer("X");
      newPlayer = "";
      // Otherwise, Ensure it is next players turn
    } else if(numberOfPlayers === 2) {
      if(player == "X") {
        setPlayer("O");
      } else {
        setPlayer("X");
      }
    }

    if(newPlayer === "O" && numberOfPlayers === 3) {
      setPlayer("X");
      newPlayer = "";
    } else if(newPlayer === "X" && numberOfPlayers === 3) {
      setPlayer("X");
      newPlayer = "";
    } else if(newPlayer === 'Y' && numberOfPlayers === 3) {
      setPlayer('X')
      newPlayer = ''
      // Otherwise, Ensure it is next players turn
    } else if(numberOfPlayers === 3) {
      if(player == "X") {
        setPlayer("O");
      } else if(player == 'O') {
        setPlayer("Y");
      } else {
        setPlayer('X')
      }
    }

    if(newPlayer === "O" && numberOfPlayers === 4) {
      setPlayer("X");
      newPlayer = "";
    } else if(newPlayer === "X" && numberOfPlayers === 4) {
      setPlayer("X");
      newPlayer = "";
    } else if(newPlayer === 'Y' && numberOfPlayers === 4) {
      setPlayer('X')
      newPlayer = ''
    } else if(newPlayer === 'Z' && numberOfPlayers === 4) {
      setPlayer('X')
      newPlayer = '';
      // Otherwise, Ensure it is next players turn
    } else if(numberOfPlayers === 4) {
      if(player === "X") {
        setPlayer("O");
      } else if(player === 'O') {
        setPlayer("Y");
      }else if(player === 'Y') {
        setPlayer('Z')
      } else {
        setPlayer('X')
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
    if(board[square] != "X" && board[square] != "O" && board[square] != "Y" && board[square] != "Z") {
      setBoard(board.map((val, idx) => {
        if(idx == square && val == "") {
          setIsPlayingClick(true);
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
        setIsPlayingGameOver(true);
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
      setIsPlayingGameOver(true);
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
    setIsPlayingGameOver(false);
  };

  const onChangePlayers = newNumberOfPlayers => {
    setNumberOfPlayers(newNumberOfPlayers)
      newPlayingBoard = chooseBoardSize(currBoardSize);
      newPlayer = "O";
      setBoard(newPlayingBoard);
      newWinCons = getWinCons(newPlayingBoard);
      setWinCons(newWinCons);
  }

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    newPlayingBoard = chooseBoardSize(parseInt(value));
    newPlayer = player;
    setBoard(newPlayingBoard);
    newWinCons = getWinCons(newPlayingBoard);
    setWinCons(newWinCons);
    setCurrBoardSize(parseInt(value))
  };

  const resetColors = () => {
    const defaultOColor = '#0000ff';
    const defaultXColor = '#ff0000';
    const defaultYColor = "#00ff11";
    const defaultZColor = "#87217a";
    const defaultBoardColor = '#7fffd4';
    const defaultActiveBoardSquare = '#64f4c4'

    setOColor(defaultOColor);
    setXColor(defaultXColor);
    setYColor(defaultYColor);
    setZColor(defaultZColor);
    setBoardColor(defaultBoardColor);
    setActiveSquareColor(defaultActiveBoardSquare);
  }

  const handleOnFinishedPlayingClick = () => {
    setIsPlayingClick(false);
  }

  const handleOnFinishedPlayingGameOver = () => {
    setIsPlayingGameOver(false);
  }

  return (
    <div className="App">
    <div className="title">Ultimate Tic-Tac-Toe</div>
      <div className="radioButtons">
        <input type="radio" value="9" defaultChecked name="boardSize" onChange={val => onChangeValue(val)}/> 3x3
        <input type="radio" value="16" name="boardSize" onChange={val => onChangeValue(val)}/> 4x4
        <input type="radio" value="25" name="boardSize" onChange={val => onChangeValue(val)}/> 5x5
        <input type="radio" value="36" name="boardSize" onChange={val => onChangeValue(val)}/> 6x6
      </div>
      <br></br>
      
      <div className="radioButtonsTwo">
        <input type="radio" value="2" defaultChecked name="numPlayer" onChange={() => onChangePlayers(2)}/> 2 Players
        <input type="radio" value="3"  name="numPlayer" onChange={() => onChangePlayers(3)}/> 3 Players
        <input type="radio" value="4"  name="numPlayer" onChange={() => onChangePlayers(4)}/> 4 Players
      </div>
      
      <div className="currPlayer">Current Player is: '{player}'</div>
      <div className="board" id="board" style={{ backgroundColor: boardColor }}>
          {rows.map((row, y) => (
            <div key={y} className="row">
              {board.slice(y * rows.length, y * rows.length + rows.length).map((square, x) => {
                const index = y * rows.length + x;
                return (
                  <Square key={index} val={board[index]} chooseSquare={() => {chooseSquare(index);}} colors={{ 'X': xColor, 'O': oColor, "Y": yColor, "Z": zColor }} activeColor={activeSquareColor} />
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
        {numberOfPlayers > 2 ? <label>Y: <input type="color" value={yColor} onChange={e => setYColor(e.target.value)} /></label> : null}
        {numberOfPlayers > 3 ? <label>Z: <input type="color" value={zColor} onChange={e => setZColor(e.target.value)} /></label> : null}     
        
        
        <Sound
          url={click}
          playStatus={isPlayingClick ? Sound.status.PLAYING : Sound.status.STOPPED}
          playFromPosition={0}
          onFinishedPlaying={handleOnFinishedPlayingClick}/>
        <Sound
          url={gameOver}
          playStatus={isPlayingGameOver ? Sound.status.PLAYING : Sound.status.STOPPED}
          playFromPosition={0}
          onFinishedPlaying={handleOnFinishedPlayingGameOver}/>
      </div>
      <div className="resetColors">
          <button className="resetColorsButton" onClick={resetColors}>Reset Colors</button>
        </div>
      <div className="sounds">
        
      </div>
      
      <div className="winning-message" id="gameOver">
        <div data-winning-message></div>
        <button onClick={restartGame} id="restartButton">Restart</button>
      </div>
    </div>
  );
}

export default App;