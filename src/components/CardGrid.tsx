import React, { useState } from 'react';
import Card from './Card';
import styles from './CardGrid.module.css';
import { ICardHolder, IGameState } from '@/types/gameTypes';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

interface CardGridProps {
  state: IGameState;
  onCardClick: (cardHolder: ICardHolder) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ state, onCardClick }) => {

  const handleCardClick = (cardHolder: ICardHolder) => {
    onCardClick(cardHolder);
  };

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${state.pairs}, 0.2fr)` }}>
      {state.cardHolders.map((cardHolder) => (
        <Card
          key={cardHolder.id}
          card={cardHolder.card}
          isFlipped={cardHolder.isFlipped}
          isSelected={state.selectedCardHolder?.id === cardHolder.id}
          onClick={() => handleCardClick(cardHolder)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
