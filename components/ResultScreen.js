import React from 'react';

function ResultScreen({ winner, player1, player2, onRestart, onRematch, history, scores }) {
    return (
        <div className="result-screen">
            <h1>ゲーム終了</h1>
            <h2>勝者: {winner === 'black' ? player1 : player2}</h2>
            <button onClick={onRestart}>スタート画面へ戻る</button>
            <button onClick={onRematch}>再戦する</button>

            <h3>スコア</h3>
            <p>{player1}: {scores.player1}</p>
            <p>{player2}: {scores.player2}</p>

            <h3>ゲーム履歴</h3>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        {entry.timestamp} - {entry.player1} vs {entry.player2}: {entry.winner === 'black' ? entry.player1 : entry.player2} 勝利
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResultScreen;
