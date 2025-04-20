import React, { useState } from 'react';
import CardGrid from './CardGrid';
import GameInfo from './GameInfo';
import { useToast } from '@/contexts/ToastContext';
import styles from './GameBoard.module.css';
import { flipCard, initializeGame } from '@/domain/Game';
import { getCardProvider } from '@/ui/Card';
import { ICardHolder } from '@/types/gameTypes';

interface GameBoardProps {
  pairs: number;
  onGameComplete: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ pairs, onGameComplete }) => {
  const [gameState, setGameState] = useState(initializeGame(pairs, getCardProvider()));
  const { showToast } = useToast();

  const handleCardClick = (cardHolder: ICardHolder) => {
    const {state: newState, flipResult} = flipCard(gameState, cardHolder);
    switch (flipResult.kind) {
      case 'match':
        showToast(`マッチしました！`, 'success');
        break;
      case 'unmatch':
        showToast(`残念！違います`, 'error');
        break;
    }
    setGameState(newState);
    if(newState.gameCompleted) {
      onGameComplete();
    }
  };

  return (
    <div className={styles.gameBoard}>
      <h1>Memory Game</h1>
      <GameInfo
        moves={gameState.moves}
        matches={gameState.matches}
        pairs={pairs}
      />
      <CardGrid
        state={gameState}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default GameBoard;
