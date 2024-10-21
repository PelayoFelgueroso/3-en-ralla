import confetti from "canvas-confetti"

export const TURNS = { // turnos
  X: '❌',
  O: '⚪'
}

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
}

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

export   const resetGame = (setBoard, setTurn, setWinner) => {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

export const updateBoard = (index, board, turn, setBoard, setTurn, setWinner) => {
  if (board[index]) return

  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);

  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)

  const newWinner = checkWinner(newBoard)
  if (newWinner) {
    confetti()
    setWinner(newWinner)
  } else if (checkEndGame(newBoard)) {
    setWinner(false)
  }
};