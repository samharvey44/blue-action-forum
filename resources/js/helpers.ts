export const ellipsise = (string: string, maxLength: number): string =>
    string.length > maxLength ? `${string.slice(0, maxLength)}...` : string;
