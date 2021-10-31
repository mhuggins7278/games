import { writable, readable, derived, get } from 'svelte/store';

export const currentPlayer = writable('X');

export const winner = writable(null);

export const initialBoard = readable(
	new Map([
		[2, null],
		[7, null],
		[6, null],
		[9, null],
		[5, null],
		[1, null],
		[4, null],
		[3, null],
		[8, null]
	])
);

export const squares = writable(new Map(get(initialBoard)));

export const status = derived(currentPlayer, ($currentPlayer) => {
	return `Next Player: ${$currentPlayer}`;
});
