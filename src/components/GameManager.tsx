import React, { useState } from 'react';
import GameBoard from './GameBoard';
import Celebration from './Celebration';

const GameManager: React.FC = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleGameComplete = () => {
    setShowCelebration(true);
  };

  return (
    <>
      <GameBoard onGameComplete={handleGameComplete} />
      {showCelebration && (
        <Celebration onClose={() => setShowCelebration(false)} />
      )}
    </>
  );
};

export default GameManager; 