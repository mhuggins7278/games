import { writable, readable, derived, get } from 'svelte/store';
import { browser } from '$app/env';

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

export const status = derived(currentPlayer, $currentPlayer => {
	return `Next Player: ${$currentPlayer}`;
});

export const record = writable(
	browser && JSON.parse(sessionStorage.getItem('TicTacToeRecord')) || {wins: 0, losses: 0, draws: 0}
);

record.subscribe((val) => browser && sessionStorage.setItem('TicTacToeRecord', JSON.stringify(val)))
