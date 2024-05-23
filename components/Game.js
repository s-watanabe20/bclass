import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';

function Game({ boardSize, player1, player2, onGameOver }) {
    // 状態の設定
    const [board, setBoard] = useState([]); // 盤の状態
    const [currentPlayer, setCurrentPlayer] = useState('black'); // 現在のプレイヤー
    const [winner, setWinner] = useState(null); // 勝者
    const [blackCount, setBlackCount] = useState(0); // 黒の駒数
    const [whiteCount, setWhiteCount] = useState(0); // 白の駒数
    const timerRef = useRef(null); // タイマー参照
    const [timeLeft, setTimeLeft] = useState(30); // 残り時間

    // 初期盤面を設定
    useEffect(() => {
        const initialBoard = Array.from({ length: boardSize }, () =>
            Array(boardSize).fill(null)
        );
        const mid = Math.floor(boardSize / 2);
        initialBoard[mid - 1][mid - 1] = 'white';
        initialBoard[mid][mid] = 'white';
        initialBoard[mid - 1][mid] = 'black';
        initialBoard[mid][mid - 1] = 'black';
        setBoard(initialBoard);
        resetTimer();
    }, [boardSize]);

    useEffect(() => {
        document.documentElement.style.setProperty('--board-size', boardSize);
    }, [boardSize]);

    // タイマーの設定
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSkip();
        }
        const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    // タイマーをリセット
    const resetTimer = () => {
        setTimeLeft(10);
    };

    // セルがクリックされたときの処理
    const handleCellClick = (row, col) => {
        if (board[row][col] || winner) return;

        const newBoard = board.map((row) => row.slice());
        const validMove = makeMove(newBoard, row, col, currentPlayer);

        if (validMove) {
            setBoard(newBoard);
            resetTimer();
            setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');

            if (checkGameOver(newBoard)) {
                const winner = calculateWinner(newBoard);
                setWinner(winner);
                updateCounts(newBoard);
                onGameOver(winner, blackCount, whiteCount);
            }
        }
    };

    // スキップボタンがクリックされたときの処理
    const handleSkip = () => {
        resetTimer();
        setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
    };

    // 降参ボタンがクリックされたときの処理
    const handleSurrender = () => {
        const winner = currentPlayer === 'black' ? 'white' : 'black';
        setWinner(winner);
        updateCounts(board);
        onGameOver(winner, blackCount, whiteCount);
    };

    // 駒を置く処理
    const makeMove = (board, row, col, player) => {
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        let validMove = false;

        for (let [dx, dy] of directions) {
            const cellsToFlip = [];
            let x = row + dx;
            let y = col + dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] && board[x][y] !== player) {
                cellsToFlip.push([x, y]);
                x += dx;
                y += dy;
            }
            if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === player && cellsToFlip.length > 0) {
                validMove = true;
                cellsToFlip.forEach(([fx, fy]) => {
                    board[fx][fy] = player;
                });
            }
        }

        if (validMove) {
            board[row][col] = player;
        }

        return validMove;
    };

    // ゲームが終了したかどうかを確認
    const checkGameOver = (board) => {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col] === null && (
                    canMove([...board], row, col, 'black') ||
                    canMove([...board], row, col, 'white')
                )) {
                    return false;
                }
            }
        }
        return true;
    };

    // 駒を置けるかどうかを確認
    const canMove = (board, row, col, player) => {
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        for (let [dx, dy] of directions) {
            const cellsToFlip = [];
            let x = row + dx;
            let y = col + dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] && board[x][y] !== player) {
                cellsToFlip.push([x, y]);
                x += dx;
                y += dy;
            }
            if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === player && cellsToFlip.length > 0) {
                return true;
            }
        }
        return false;
    };

    // 勝者を計算
    const calculateWinner = (board) => {
        let blackCount = 0;
        let whiteCount = 0;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col] === 'black') blackCount++;
                if (board[row][col] === 'white') whiteCount++;
            }
        }
        setBlackCount(blackCount);
        setWhiteCount(whiteCount);
        return blackCount > whiteCount ? 'black' : 'white';
    };

    // 駒数を更新
    const updateCounts = (board) => {
        let blackCount = 0;
        let whiteCount = 0;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col] === 'black') blackCount++;
                if (board[row][col] === 'white') whiteCount++;
            }
        }
        setBlackCount(blackCount);
        setWhiteCount(whiteCount);
    };

    return (
        <div className="game">
            <h2>{currentPlayer === 'black' ? player1 : player2}のターン</h2>
            <Board board={board} onCellClick={handleCellClick} />
            <button onClick={handleSkip}>スキップ</button>
            <button onClick={handleSurrender}>降参</button>
            <div>制限時間: {timeLeft}秒</div>
            {winner && (
                <div className="winner">
                    勝者: {winner === 'black' ? player1 : player2}
                </div>
            )}
        </div>
    );
}

export default Game;
