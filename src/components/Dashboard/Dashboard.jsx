import { useEffect } from "react";
import { Square } from "./components/Square";
import { resetGame } from "../../constants";

export function Dashboard({updateBoard, board}) {
  return (
      <section className="game">
      {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })
      }
      </section>
  )
}