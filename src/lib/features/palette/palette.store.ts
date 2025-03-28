import { writable } from 'svelte/store';

export const paletteColors = writable<number[][]>([]);
