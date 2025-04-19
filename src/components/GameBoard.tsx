import React, { useState } from 'react';
import CardGrid from './CardGrid';
import GameInfo from './GameInfo';
import { useToast } from '../contexts/ToastContext';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  pairs: number;
  onGameComplete: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ pairs, onGameComplete }) => {
  const [gameKey, setGameKey] = useState(0);
  const [gameState, setGameState] = useState({
    moves: 0,
    matches: 0,
  });
  const { showToast } = useToast();

  const handleMatch = (_card1: any, _card2: any) => {
    showToast(`マッチしました！`, 'success');
    setGameState(prev => {
      const newState = {
        moves: prev.moves + 1,
        matches: prev.matches + 1,
      };
      if (newState.matches === pairs) {
        onGameComplete();
      }
      return newState;
    });
  };

  const handleMismatch = (_card1: any, _card2: any) => {
    showToast(`残念！違います`, 'error');
    setGameState(prev => ({
      ...prev,
      moves: prev.moves + 1,
    }));
  };

  return (
    <div className={styles.gameBoard}>
      <h1>Memory Game</h1>
      <GameInfo
        moves={gameState.moves}
        matches={gameState.matches}
        pairs={pairs}
      />
      <CardGrid
        key={gameKey}
        pairs={pairs}
        onMatch={handleMatch}
        onMismatch={handleMismatch}
      />
    </div>
  );
};

export default GameBoard; 