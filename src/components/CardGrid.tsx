import React, { useState } from 'react';
import Card from './Card';
import styles from './CardGrid.module.css';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

interface CardGridProps {
  pairs: number;
  onMatch: (card1: Card, card2: Card) => void;
  onMismatch: (card1: Card, card2: Card) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ pairs, onMatch, onMismatch }) => {
  const initialCards: Card[] = Array.from({ length: pairs * 2 }, (_, index) => ({
    id: index,  // インデックスをそのままIDとして使用
    value: String.fromCharCode(65 + (index % pairs)),
    isFlipped: false
  }));

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = async (clickedCardIndex: number) => {
    // すでにめくられているカード、または判定中は無視
    const card = cards[clickedCardIndex];  // インデックスアクセス
    if (!card || card.isFlipped || isChecking) return;

    if(selectedCardIndex !== null) {
      // 2枚目をめくった場合
      setIsChecking(true);
    }

    // カードをめくる
    const newCards = [...cards];
    newCards[clickedCardIndex] = { ...card, isFlipped: true };
    setCards(newCards);

    if (selectedCardIndex === null) {
      // 1枚目をめくった場合
      setSelectedCardIndex(clickedCardIndex);
    } else {
      // 2枚目をめくった場合
      const card1 = newCards[selectedCardIndex];
      const card2 = newCards[clickedCardIndex];

      // マッチ判定
      if (card1.value === card2.value) {
        onMatch(card1, card2);
      } else {
        onMismatch(card1, card2);
        // 少し待ってからカードを伏せる
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCards(prevCards => {
          const newCards = [...prevCards];
          newCards[selectedCardIndex] = { ...newCards[selectedCardIndex], isFlipped: false };
          newCards[clickedCardIndex] = { ...newCards[clickedCardIndex], isFlipped: false };
          return newCards;
        });
      }
      setSelectedCardIndex(null);
      setIsChecking(false);
    }
  };

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${pairs}, 1fr)` }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          isSelected={selectedCardIndex === card.id}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid; 