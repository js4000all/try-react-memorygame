import React, { useEffect, useState } from 'react';
import styles from './Celebration.module.css';

interface CelebrationProps {
  onClose: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ onClose }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number }>>([]);

  useEffect(() => {
    // コンフェティを生成
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
    }));
    setConfetti(newConfetti);

    // 5秒後に閉じる
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.celebration}>
      <div className={styles.message}>
        <h2>おめでとうございます！</h2>
        <p>ゲームクリアですわ！</p>
      </div>
      {confetti.map(({ id, left }) => (
        <div
          key={id}
          className={styles.confetti}
          style={{
            left: `${left}%`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Celebration; 