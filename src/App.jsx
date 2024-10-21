import { useState } from "react";
import "./App.css";
import { Turns } from "./components/Dashboard/components/Turns.jsx"; 
import { TURNS, checkEndGame, checkWinner, resetGame, updateBoard } from "./constants.js";
import { WinnerSection } from "./components/Dashboard/components/Winner.jsx";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import { ResetButton } from "./components/ResetButton.jsx";

export function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <ResetButton resetGame={() => resetGame(setBoard, setTurn, setWinner)} />
      <Dashboard board={board} updateBoard={(index) => updateBoard(index, board, turn, setBoard, setTurn, setWinner)}/>
      <Turns turn={turn}/>
      <WinnerSection winner={winner} resetGame={() => resetGame(setBoard, setTurn, setWinner)}/>
    </main>
  );
}