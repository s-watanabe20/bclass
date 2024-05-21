import React from 'react';
import './Board.css';

function Board({ board, onCellClick }) {
    return (
        <div className="board" style={{ gridTemplateColumns: `repeat(${board.length}, 1fr)` }}>
            {board.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`cell ${cell}`}
                        onClick={() => onCellClick(rowIndex, colIndex)}
                    >
                        {cell && <div className={`piece ${cell}`}></div>}
                    </div>
                ))
            ))}
        </div>
    );
}

export default Board;
