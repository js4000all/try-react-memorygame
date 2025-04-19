import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  value: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, onClick }) => {
  return (
    <div 
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      onClick={onClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          {/* カードの裏面 */}
          <span>?</span>
        </div>
        <div className={styles.cardBack}>
          {/* カードの表面 */}
          {value}
        </div>
      </div>
    </div>
  );
};

export default Card; 