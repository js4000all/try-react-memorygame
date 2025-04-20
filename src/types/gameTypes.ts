export enum Rarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
}

export interface ICard {
    readonly rarity: Rarity;
    readonly sequence: number;
}
export function isCardEqual(card1: ICard, card2: ICard): boolean {
    return card1.rarity === card2.rarity && card1.sequence === card2.sequence;
}
export type CardProvider = () => Record<Rarity, ICard[]>;

export interface ICardFace {
    readonly image: string;
    readonly position: string;
}
export type CardFaceProvider = (card: ICard) => ICardFace;

export interface ICardHolder {
    match: (other: ICardHolder) => boolean;
    readonly id: number;
    readonly isFlipped: boolean;
    readonly card: ICard;
}
export interface IGameState {
    readonly moves: number;
    readonly matches: number;
    readonly pairs: number;
    readonly selectedCardHolder: ICardHolder | null;
    readonly gameCompleted: boolean;
    readonly cardHolders: ICardHolder[];
}
export type GameInitializer = (pairs: number, cardProvider: CardProvider) => IGameState;

export type FlipResult = 
    | {kind: 'match', cardHolder1: ICardHolder, cardHolder2: ICardHolder}
    | {kind: 'unmatch', cardHolder1: ICardHolder, cardHolder2: ICardHolder}
    | {kind: 'pending', cardHolder: ICardHolder}
    | {kind: 'no-op'}

export type GameFlipCard = (
    state: IGameState, cardHolder: ICardHolder) => {
        state: IGameState,
        flipResult: FlipResult
    };
