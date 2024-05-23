import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import ResultScreen from './components/ResultScreen';
import './App.css';

function App() {
  // アプリケーションの状態を管理するフック
  const [screen, setScreen] = useState('start'); // 現在の画面
  const [boardSize, setBoardSize] = useState(8); // 盤のサイズ
  const [player1, setPlayer1] = useState(''); // プレイヤー1の名前
  const [player2, setPlayer2] = useState(''); // プレイヤー2の名前
  const [winner, setWinner] = useState(null); // 勝者
  const [history, setHistory] = useState([]); // ゲームの履歴
  const [scores, setScores] = useState({ player1: 0, player2: 0 }); // プレイヤーのスコア
  const [blackCount, setBlackCount] = useState(0); // 黒の駒数
  const [whiteCount, setWhiteCount] = useState(0); // 白の駒数

  // ゲーム開始時の処理
  const handleStart = (size, p1, p2) => {
    setBoardSize(size);
    setPlayer1(p1);
    setPlayer2(p2);
    setScreen('game');
  };

  // ゲーム終了時の処理
  const handleGameOver = (winner, blackCount, whiteCount) => {
    setWinner(winner);
    setBlackCount(blackCount);
    setWhiteCount(whiteCount);
    setScreen('result');
    const newHistoryEntry = {
      player1,
      player2,
      winner,
      blackCount,
      whiteCount,
      timestamp: new Date().toLocaleString(),
    };
    setHistory([...history, newHistoryEntry]);
    setScores((prevScores) => ({
      ...prevScores,
      [winner === 'black' ? 'player1' : 'player2']: prevScores[winner === 'black' ? 'player1' : 'player2'] + 1,
    }));
  };

  // スタート画面に戻る処理
  const handleRestart = () => {
    setScreen('start');
  };

  // 再戦処理
  const handleRematch = () => {
    setScreen('game');
  };

  return (
    <div className="App">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'game' && <Game boardSize={boardSize} player1={player1} player2={player2} onGameOver={handleGameOver} />}
      {screen === 'result' && (
        <ResultScreen
          winner={winner}
          player1={player1}
          player2={player2}
          onRestart={handleRestart}
          onRematch={handleRematch}
          history={history}
          scores={scores}
          blackCount={blackCount}
          whiteCount={whiteCount}
        />
      )}
    </div>
  );
}

export default App;
