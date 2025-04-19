import React, { useState } from 'react';
import CardGrid from './CardGrid';
import styles from './GameBoard.module.css';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, value: 'A', isFlipped: false },
    { id: 2, value: 'B', isFlipped: false },
    { id: 3, value: 'C', isFlipped: false },
    { id: 4, value: 'D', isFlipped: false },
    { id: 5, value: 'A', isFlipped: false },
    { id: 6, value: 'B', isFlipped: false },
    { id: 7, value: 'C', isFlipped: false },
    { id: 8, value: 'D', isFlipped: false },
  ]);

  const handleCardClick = (id: number) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id && !card.isFlipped
          ? { ...card, isFlipped: true }
          : card
      )
    );
  };

  return (
    <div className={styles.gameBoard}>
      <h1>Memory Game</h1>
      <CardGrid
        cards={cards}
        onCardClick={handleCardClick}
        pairs={4}
      />
    </div>
  );
};

export default GameBoard; 