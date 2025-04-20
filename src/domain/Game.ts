import { CardProvider, FlipResult, GameFlipCard, GameInitializer, ICard, ICardHolder, IGameState, isCardEqual } from '../types/gameTypes';
import { sample, shuffle } from '../utils/collections';


function _initializeGame(pairs: number, cardProvider: CardProvider): IGameState {
  const allCards = Object.values(cardProvider()).flat();
  const cards: ICard[] = sample(allCards, pairs);
  const cardPairs: ICard[] = shuffle<ICard>([...cards, ...cards]);

  return {
    pairs,
    gameCompleted: false,
    cardHolders: cardPairs.map((card, index) => new CardHolder(index, card, false)),
    moves: 0,
    matches: 0,
    selectedCardHolder: null,
  };
}

export class CardHolder implements ICardHolder {
  public readonly id: number;

  constructor(readonly index: number, readonly card: ICard, readonly isFlipped: boolean) {
    this.index = index;
    this.id = index;
    this.card = card;
    this.isFlipped = isFlipped;
  }

  match(other: ICardHolder): boolean {
    if (other === this) {
      throw new Error('CardHolder cannot match itself');
    }
    return isCardEqual(this.card, other.card);
  }

  static flip(cardHolder: ICardHolder): ICardHolder {
    return CardHolder._copyWithFlipped(cardHolder, true);
  }
  static unflip(cardHolder: ICardHolder): ICardHolder {
    return CardHolder._copyWithFlipped(cardHolder, false);
  }
  static _copyWithFlipped(cardHolder: ICardHolder, isFlipped: boolean): CardHolder {
    if(!(cardHolder instanceof CardHolder)) {
      throw new Error('cardHolder is not a CardHolder');
    }
    return new CardHolder(cardHolder.id, cardHolder.card, isFlipped);
  }
}

function _flipCard(
  state: IGameState, cardHolder: ICardHolder): {
    state: IGameState,
    flipResult: FlipResult
  } {
  if(!(cardHolder instanceof CardHolder)) {
    throw new Error('cardHolder is not a CardHolder');
  }
  if(cardHolder.isFlipped) {
    return {
      state,
      flipResult: {kind: 'no-op'}
    };
  }

  if (state.selectedCardHolder === null) {
    const newCards = state.cardHolders;
    newCards[cardHolder.index] = CardHolder.flip(cardHolder);
    const newState = {
      ...state,
      cardHolders: newCards,
      selectedCardHolder: cardHolder,
    };
    return {
      state: newState,
      flipResult: {kind: 'pending', cardHolder}
    };
  }
  else {
    var matches = state.matches;
    const selectedCardHolder = state.selectedCardHolder;
    const newCardHolders = state.cardHolders;
    const matched = selectedCardHolder.match(cardHolder);
    if(matched) {
      newCardHolders[cardHolder.index] = CardHolder.flip(cardHolder);
    }
    else {
      newCardHolders[selectedCardHolder.id] = CardHolder.unflip(selectedCardHolder);
    }
    const newMatches = matched ? matches + 1 : matches;
    const newState = {
      ...state,
      moves: state.moves + 1,
      matches: newMatches,
      gameCompleted: newMatches === state.pairs,
      selectedCardHolder: null,
      cardHolders: newCardHolders,
    };
    const kind = matched ? 'match' : 'unmatch';
    return {
      state: newState,
      flipResult: {kind, cardHolder1: selectedCardHolder, cardHolder2: cardHolder}
    };
  }
}

export const initializeGame: GameInitializer = _initializeGame;
export const flipCard: GameFlipCard = _flipCard;
