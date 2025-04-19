import React, { useState } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import Celebration from './Celebration';

const GameManager: React.FC = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [pairs, setPairs] = useState(4);

  const handleGameComplete = () => {
    setShowCelebration(true);
  };

  const handleRestart = (newPairs: number) => {
    setPairs(newPairs);
  };

  return (
    <>
      <GameBoard
        pairs={pairs}
        onGameComplete={handleGameComplete}
      />
      <GameControls
        currentPairs={pairs}
        onRestart={handleRestart}
      />
      {showCelebration && (
        <Celebration onClose={() => setShowCelebration(false)} />
      )}
    </>
  );
};

export default GameManager; 
