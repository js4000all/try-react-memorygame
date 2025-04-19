import React, { useState } from 'react';
import CardGrid from './CardGrid';
import GameInfo from './GameInfo';
import Toast from './Toast';
import styles from './GameBoard.module.css';

interface GameState {
  moves: number;
  matches: number;
  isGameComplete: boolean;
}

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const INITIAL_GAME_STATE: GameState = {
  moves: 0,
  matches: 0,
  isGameComplete: false,
};

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [gameKey, setGameKey] = useState(0);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [toastId, setToastId] = useState(0);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = toastId;
    setToastId(prev => prev + 1);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleMatch = (card1: any, card2: any) => {
    console.log(`マッチしました！: ${card1.value} と ${card2.value}`);
    showToast(`マッチしました！: ${card1.value} と ${card2.value}`, 'success');
    setGameState(prev => ({
      ...prev,
      matches: prev.matches + 1,
      moves: prev.moves + 1,
      isGameComplete: prev.matches + 1 === 4,
    }));
  };

  const handleMismatch = (card1: any, card2: any) => {
    console.log(`残念！: ${card1.value} と ${card2.value} は違います`);
    showToast(`残念！: ${card1.value} と ${card2.value} は違います`, 'error');
    setGameState(prev => ({
      ...prev,
      moves: prev.moves + 1,
    }));
  };

  const handleRestart = () => {
    setGameState(INITIAL_GAME_STATE);
    setGameKey(prev => prev + 1);
  };

  return (
    <div className={styles.gameBoard}>
      <h1>Memory Game</h1>
      <GameInfo
        moves={gameState.moves}
        matches={gameState.matches}
        isGameComplete={gameState.isGameComplete}
        onRestart={handleRestart}
      />
      <CardGrid
        key={gameKey}
        pairs={4}
        onMatch={handleMatch}
        onMismatch={handleMismatch}
      />
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard; 