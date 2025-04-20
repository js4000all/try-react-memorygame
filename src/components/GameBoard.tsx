import React, { useEffect, useState } from 'react';
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

interface UIState {
  isAnimating: boolean;
  pendingUnflipCardHolderIds: number[];
}

const GameBoard: React.FC<GameBoardProps> = ({ pairs, onGameComplete }) => {
  const [gameState, setGameState] = useState(initializeGame(pairs, getCardProvider()));
  const [uiState, setUiState] = useState<UIState>({
    isAnimating: false,
    pendingUnflipCardHolderIds: [] //一時的にフリップ状態にするカード＝マッチしなかったカード
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (uiState.pendingUnflipCardHolderIds.length > 0) {
      const timer = setTimeout(() => {
        setUiState(_prev => ({
          isAnimating: false,
          pendingUnflipCardHolderIds: [],
        }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [uiState.pendingUnflipCardHolderIds]);

  const handleCardClick = (cardHolder: ICardHolder) => {
    if (uiState.isAnimating) return;

    const { state: newState, flipResult } = flipCard(gameState, cardHolder);
    switch (flipResult.kind) {
      case 'match':
        showToast(`マッチしました！ [${flipResult.cardHolder1.card.rarity}]`, 'success');
        break;
      case 'unmatch':
        showToast(`残念！違います`, 'error');
        setUiState(_prev => ({
          isAnimating: true,
          pendingUnflipCardHolderIds: [flipResult.cardHolder1.id, flipResult.cardHolder2.id],
        }));
        break;
    }
    setGameState(newState);
    if (newState.gameCompleted) {
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
        pendingUnflipCardHolderIds={uiState.pendingUnflipCardHolderIds}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default GameBoard;
