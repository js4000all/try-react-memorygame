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
        <p>手数: {moves}</p>
        <p>マッチ: {matches}/4</p>
      </div>
      {isGameComplete && (
        <div className={styles.completionMessage}>
          <p>おめでとうございます！ゲームクリアですわ！</p>
        </div>
      )}
      <button onClick={onRestart} className={styles.restartButton}>
        もう一度遊ぶ
      </button>
    </div>
  );
};

export default GameInfo; 