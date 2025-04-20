import Card from './Card';
import styles from './CardGrid.module.css';
import { ICardHolder, IGameState } from '@/types/gameTypes';

interface CardGridProps {
  state: IGameState;
  pendingUnflipCardHolderIds: number[];
  onCardClick: (cardHolder: ICardHolder) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ state, pendingUnflipCardHolderIds, onCardClick }) => {

  const handleCardClick = (cardHolder: ICardHolder) => {
    onCardClick(cardHolder);
  };

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${state.pairs}, 0.2fr)` }}>
      {state.cardHolders.map((cardHolder) => {
        const isFlipped =
          pendingUnflipCardHolderIds.includes(cardHolder.id) || cardHolder.isFlipped;
        return (
          <Card
            key={cardHolder.id}
            card={cardHolder.card}
            isFlipped={isFlipped}
            isSelected={state.selectedCardHolder?.id === cardHolder.id}
            onClick={() => handleCardClick(cardHolder)}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
