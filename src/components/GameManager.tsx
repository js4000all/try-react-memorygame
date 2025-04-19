import React, { useState } from 'react';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import Celebration from './Celebration';

const GameManager: React.FC = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [pairs, setPairs] = useState(4);
  const [gameKey, setGameKey] = useState(0);

  const handleGameComplete = () => {
    setShowCelebration(true);
  };

  const handleRestart = (newPairs: number) => {
    setPairs(newPairs);
    setGameKey(prev => prev + 1);
  };

  return (
    <>
      <GameBoard
        key={gameKey}
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
