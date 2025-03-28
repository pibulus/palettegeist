import { writable } from 'svelte/store';

export const paletteColors = writable<number[][]>([]);
export const colorCount = writable<9 | 16>(9);

// We'll handle re-extraction in the component without resetting everything
