import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, isSelected, onClick }) => {
  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.cardBack} />
        <div className={`${styles.cardFront} ${styles[value]}`} />
      </div>
    </div>
  );
};

export default Card; 