import React from 'react';
import styles from './GameInfo.module.css';

interface GameInfoProps {
  moves: number;
  matches: number;
  isGameComplete: boolean;
  onRestart: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ moves, matches, isGameComplete, onRestart }) => {
  return (
    <div className={styles.gameInfo}>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>手数</span>
          <span className={styles.statValue}>{moves}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>マッチ</span>
          <span className={styles.statValue}>{matches}/4</span>
        </div>
      </div>
      <button onClick={onRestart} className={styles.restartButton}>
        もう一度遊ぶ
      </button>
    </div>
  );
};

export default GameInfo; 