import React, { useState } from 'react';
import styles from './GameInfo.module.css';

interface GameInfoProps {
  moves: number;
  matches: number;
  onRestart: (pairs: number) => void;
  pairs: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ moves, matches, onRestart, pairs }) => {
  const [pendingPairs, setPendingPairs] = useState(pairs);

  const handlePairsChange = (newPairs: number) => {
    setPendingPairs(newPairs);
  };

  const handleRestart = () => {
    onRestart(pendingPairs);
  };

  return (
    <div className={styles.gameInfo}>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>手数</span>
          <span className={styles.statValue}>{moves}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>マッチ</span>
          <span className={styles.statValue}>{matches}/{pairs}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.pairsControl}>
          <label htmlFor="pairs">ペア数: {pendingPairs}</label>
          <input
            type="range"
            id="pairs"
            min="2"
            max="6"
            value={pendingPairs}
            onChange={(e) => handlePairsChange(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
        <button onClick={handleRestart} className={styles.restartButton}>
          もう一度遊ぶ
        </button>
      </div>
    </div>
  );
};

export default GameInfo; 