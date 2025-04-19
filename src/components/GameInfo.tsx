import styles from './GameInfo.module.css';

interface GameInfoProps {
  moves: number;
  matches: number;
  pairs: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ moves, matches, pairs }) => {
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
    </div>
  );
};

export default GameInfo; 