export function generateSuffix(length: number = 6): string {
    return Math.random().toString(36).slice(2, 2+length).toUpperCase();
}