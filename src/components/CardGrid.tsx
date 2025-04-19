import React from 'react';
import Card from './Card';
import styles from './CardGrid.module.css';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

interface CardGridProps {
  cards: Card[];
  onCardClick: (id: number) => void;
  pairs: number;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, pairs }) => {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${pairs}, 1fr)` }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid; 