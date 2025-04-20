import { CardProvider, CardFaceProvider, ICard, Rarity, ICardFace } from '../types/gameTypes';
import common_01 from '../assets/card-face/common_01.png';
import rare_01 from '../assets/card-face/rare_01.png';
import rare_02 from '../assets/card-face/rare_02.png';
import epic_01 from '../assets/card-face/epic_01.png';
import epic_02 from '../assets/card-face/epic_02.png';
import { divmod } from '../utils/math';

const IMAGES_IN_FILE = 4;

const resources : Record<Rarity, string[]> = {
    [Rarity.COMMON]: [common_01],
    [Rarity.RARE]: [rare_01, rare_02],
    [Rarity.EPIC]: [epic_01, epic_02],
}
const positions : {[imageIndex: number]: string} = {
    0: '0, 0',
    1: '100% 0',
    2: '0 100%',
    3: '100% 100%',
}


function toCards(rarity: Rarity, resources: string[], imagesInFile: number) : ICard[] {
    const numOfCards = resources.length * imagesInFile;
    return Array.from({ length: numOfCards }, (_, index) => ({
        rarity: rarity,
        sequence: index,
    }));
}

function getCards(): Record<Rarity, ICard[]> {
    const cards = {} as Record<Rarity, ICard[]>;
    for (const rarity in resources) {
        cards[rarity as Rarity] = toCards(rarity as Rarity, resources[rarity as Rarity], IMAGES_IN_FILE);
    }
    return cards;
}

function getFaceImage(rarity: Rarity, sequence: number) : ICardFace {
    const { quotient: fileIndex, remainder: imageIndexInFile } = divmod(sequence, IMAGES_IN_FILE);
    return {
        image: `url(${resources[rarity][fileIndex]})`,
        position: positions[imageIndexInFile],
    }
}

export function getCardProvider() : CardProvider {
    return () => getCards();
}
export function getCardFaceProvider() : CardFaceProvider {
    return (card: ICard) => getFaceImage(card.rarity, card.sequence);
}
