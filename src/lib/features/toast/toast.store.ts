import { writable } from 'svelte/store';

export const toastMessage = writable<string | null>(null);

export function showToast(message: string, duration = 2000) {
  toastMessage.set(message);
  setTimeout(() => toastMessage.set(null), duration);
}
