import React, { useState } from "react";
import Square from "./Square";

const Board: React.FC = () => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i: number) => {
        if(calculateWinner(squares)|| squares[i]){
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }


    const renderSquare = (i: number) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />

    }

    const winner = calculateWinner(squares);

    const status = winner ? `Ganador: ${winner}` :
        isDraw(squares) ? 'Empate' : `Turno de: ${xIsNext ? 'X' : 'O'}`


    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
            </div>
        </div>

    )
}

function isDraw(squares: (string | null)[]): boolean {
    for (const square of squares) {
        if (!square) {
            return false;
        }
    }
    return true;
}

function calculateWinner(squares: (string | null)[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    // POSIBLES SOLUCIONES 

    for (const item of lines) {
        const [a, b, c] = item;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

}

export default Board;


