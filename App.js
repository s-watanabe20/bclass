import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import ResultScreen from './components/ResultScreen';
import './App.css';

function App() {
  const [screen, setScreen] = useState('start');
  const [boardSize, setBoardSize] = useState(8);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const handleStart = (size, p1, p2) => {
    setBoardSize(size);
    setPlayer1(p1);
    setPlayer2(p2);
    setScreen('game');
  };

  const handleGameOver = (winner) => {
    setWinner(winner);
    setScreen('result');
    const newHistoryEntry = {
      player1,
      player2,
      winner,
      timestamp: new Date().toLocaleString(),
    };
    setHistory([...history, newHistoryEntry]);
    setScores((prevScores) => ({
      ...prevScores,
      [winner === 'black' ? 'player1' : 'player2']: prevScores[winner === 'black' ? 'player1' : 'player2'] + 1,
    }));
  };

  const handleRestart = () => {
    setScreen('start');
  };

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
        />
      )}
    </div>
  );
}

export default App;
