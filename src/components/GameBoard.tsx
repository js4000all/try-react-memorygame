import React from 'react';
import CardGrid from './CardGrid';
import styles from './GameBoard.module.css';

const GameBoard: React.FC = () => {
  const handleMatch = (card1: any, card2: any) => {
    console.log(`マッチしました！: ${card1.value} と ${card2.value}`);
  };

  const handleMismatch = (card1: any, card2: any) => {
    console.log(`残念！: ${card1.value} と ${card2.value} は違います`);
  };

  return (
    <div className={styles.gameBoard}>
      <h1>Memory Game</h1>
      <CardGrid
        pairs={4}
        onMatch={handleMatch}
        onMismatch={handleMismatch}
      />
    </div>
  );
};

export default GameBoard; 