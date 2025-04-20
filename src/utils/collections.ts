export function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

export function sample<T>(array: T[], n: number): T[] {
    return shuffle(array).slice(0, n);
}
