import { writable } from 'svelte/store';

const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
const initialTheme = storedTheme || 'light';

export const theme = writable<string>(initialTheme);

theme.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', value);
  }
});
