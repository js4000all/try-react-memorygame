import React from 'react';
import styles from './Card.module.css';
import { getCardFaceProvider } from '@/ui/Card';
import { ICard } from '@/types/gameTypes';

interface CardProps {
  card: ICard;
  isFlipped: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, isSelected, onClick }) => {
  const cardFace = getCardFaceProvider()(card);
  const backgroundImage = {
    backgroundImage: cardFace.image,
    backgroundPosition: cardFace.position,
  }
  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.cardBack} />
        <div className={`${styles.cardFront}`} style={backgroundImage} />
      </div>
    </div>
  );
};

export default Card;
