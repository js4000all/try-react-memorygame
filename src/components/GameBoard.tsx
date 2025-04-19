import React, { useState } from 'react';
import CardGrid from './CardGrid';
import GameInfo from './GameInfo';
import Celebration from './Celebration';
import { useToast } from '../contexts/ToastContext';
import styles from './GameBoard.module.css';

interface GameState {
  moves: number;
  matches: number;
  isGameComplete: boolean;
}

const INITIAL_GAME_STATE: GameState = {
  moves: 0,
  matches: 0,
  isGameComplete: false,
};

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [gameKey, setGameKey] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const { showToast } = useToast();

  const handleMatch = (_card1: any, _card2: any) => {
    showToast(`マッチしました！`, 'success');
    setGameState(prev => {
      const newState = {
        ...prev,
        matches: prev.matches + 1,
        moves: prev.moves + 1,
        isGameComplete: prev.matches + 1 === 4,
      };
      if (newState.isGameComplete) {
        setShowCelebration(true);
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

  const handleRestart = () => {
    setGameState(INITIAL_GAME_STATE);
    setGameKey(prev => prev + 1);
    setShowCelebration(false);
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
      {showCelebration && (
        <Celebration onClose={() => setShowCelebration(false)} />
      )}
    </div>
  );
};

export default GameBoard; 