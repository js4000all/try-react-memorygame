export enum Rarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
}

export interface ICard {
    readonly rarity: Rarity;
    readonly sequence: number;
}
export type CardProvider = () => Record<Rarity, ICard[]>;

export interface ICardFace {
    readonly image: string;
    readonly position: string;
}
export type CardFaceProvider = (card: ICard) => ICardFace;

export interface ICardHolder {
    match: (other: ICardHolder) => boolean;
    readonly isFlipped: boolean;
    readonly card: ICard;
}
export interface IGameState {
    readonly moves: number;
    readonly matches: number;
    readonly cards: ICardHolder[];
    flipCard: (card: ICardHolder) => IGameState;
}
export type GameInitializer = (pairs: number, cardProvider: CardProvider) => IGameState;
