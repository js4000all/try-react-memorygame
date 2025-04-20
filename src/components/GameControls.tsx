import React, { useState } from 'react';
import styles from './GameControls.module.css';

interface GameControlsProps {
  currentPairs: number;
  onRestart: (pairs: number) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ currentPairs, onRestart }) => {
  const [pendingPairs, setPendingPairs] = useState(currentPairs);

  const handlePairsChange = (newPairs: number) => {
    setPendingPairs(newPairs);
  };

  const handleRestart = () => {
    onRestart(pendingPairs);
  };

  return (
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
  );
};

export default GameControls; 