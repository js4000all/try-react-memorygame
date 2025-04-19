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
    id: index + 1,
    value: String.fromCharCode(65 + (index % pairs)), // A, B, C, ...
    isFlipped: false
  }));

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = async (id: number, isFlipped: boolean) => {
    // すでにめくられているカードは無視
    if (isFlipped) return;
    // ガードチェック（isCheckingのチェックを先に行う）
    if (isChecking) return;

    // 2枚目をめくる場合は、先にisCheckingをtrueに
    if (selectedCard !== null) {
      setIsChecking(true);
    }

    // カードをめくる
    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    // 選択中のカードを更新
    const newSelectedCard = selectedCard === null ? id : null;
    setSelectedCard(newSelectedCard);

    // 2枚目をめくった場合
    if (selectedCard !== null) {
      const card1 = newCards.find(c => c.id === selectedCard)!;
      const card2 = newCards.find(c => c.id === id)!;

      // マッチ判定
      if (card1.value === card2.value) {
        onMatch(card1, card2);
        setIsChecking(false);
      } else {
        onMismatch(card1, card2);
        // 少し待ってからカードを伏せる
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCards(prevCards => 
          prevCards.map(c => 
            c.id === selectedCard || c.id === id ? { ...c, isFlipped: false } : c
          )
        );
        setIsChecking(false);
      }
    }
  };

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${pairs}, 1fr)` }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          value={card.value}
          isFlipped={card.isFlipped}
          onClick={() => handleCardClick(card.id, card.isFlipped)}
        />
      ))}
    </div>
  );
};

export default CardGrid; 