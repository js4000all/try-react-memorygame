export function divmod(a: number, b: number): { quotient: number; remainder: number } {
    const quotient = Math.floor(a / b);
    const remainder = a % b;
    return { quotient, remainder };
}
