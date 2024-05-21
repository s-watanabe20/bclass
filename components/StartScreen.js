import React, { useState } from 'react';

function StartScreen({ onStart }) {
    const [boardSize, setBoardSize] = useState(8);
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    const handleStart = () => {
        if (player1 && player2) {
            onStart(boardSize, player1, player2);
        }
    };

    return (
        <div className="start-screen">
            <h1>オセロゲーム</h1>
            <div>
                <label>
                    盤の広さ:
                    <select value={boardSize} onChange={(e) => setBoardSize(Number(e.target.value))}>
                        <option value={8}>8x8</option>
                        <option value={10}>10x10</option>
                        <option value={12}>12x12</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    プレイヤー1:
                    <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    プレイヤー2:
                    <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
                </label>
            </div>
            <button onClick={handleStart}>開始</button>
        </div>
    );
}

export default StartScreen;
