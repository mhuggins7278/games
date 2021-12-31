import { writable, readable, derived, get } from 'svelte/store';
import { browser } from '$app/env';
export const width = readable(10);
export const bombAmount = readable(20);
export const flags = writable(0);
export const isGameOver = writable(false);
export const board = writable([]);
export const result = writable('😐');

// export const status = derived(currentPlayer, $currentPlayer => {
// 	return `Next Player: ${$currentPlayer}`;
// });

// export const record = writable(
// 	browser && JSON.parse(sessionStorage.getItem('TicTacToeRecord')) || {wins: 0, losses: 0, draws: 0}
// );

// record.subscribe((val) => browser && sessionStorage.setItem('TicTacToeRecord', JSON.stringify(val)))
