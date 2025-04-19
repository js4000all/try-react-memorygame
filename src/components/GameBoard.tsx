import React, { useState } from 'react';
import CardGrid from './CardGrid';
import GameInfo from './GameInfo';
import styles from './GameBoard.module.css';

interface GameState {
  moves: number;
  matches: number;
  isGameComplete: boolean;
}

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    moves: 0,
    matches: 0,
    isGameComplete: false,
  });

  const handleMatch = (card1: any, card2: any) => {
    console.log(`マッチしました！: ${card1.value} と ${card2.value}`);
    setGameState(prev => ({
      ...prev,
      matches: prev.matches + 1,
      moves: prev.moves + 1,
      isGameComplete: prev.matches + 1 === 4,
    }));
  };

  const handleMismatch = (card1: any, card2: any) => {
    console.log(`残念！: ${card1.value} と ${card2.value} は違います`);
    setGameState(prev => ({
      ...prev,
      moves: prev.moves + 1,
    }));
  };

  const handleRestart = () => {
    setGameState({
      moves: 0,
      matches: 0,
      isGameComplete: false,
    });
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
        pairs={4}
        onMatch={handleMatch}
        onMismatch={handleMismatch}
      />
    </div>
  );
};

export default GameBoard; 