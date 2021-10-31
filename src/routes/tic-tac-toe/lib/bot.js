import { get } from 'svelte/store';
import { squares } from '../lib/stores';
import { updateGameState } from './game';

export const makeMove = () => {
	const localSquares = get(squares);
	const availableSquares = [...localSquares.keys()].filter((key) => !localSquares.get(key));
	if (!availableSquares.length) return;
	if (availableSquares.length === 1) return updateGameState(availableSquares[0]);
	if (availableSquares.length === 9)
		return updateGameState(availableSquares[Math.floor(Math.random() * availableSquares.length)]);

	const otherPlayersSquares = [...localSquares.keys()].filter(
		(key) => localSquares.get(key) === 'X'
	);
	const mySquares = [...localSquares.keys()].filter((key) => localSquares.get(key) === 'O');

	const winningMove = getMove(mySquares, availableSquares);
	if (winningMove) return updateGameState(winningMove);
	const blockingMove = getMove(otherPlayersSquares, availableSquares);
	if (blockingMove) return updateGameState(blockingMove);
	const nextBestMove = getNextBestMove(availableSquares);
	return updateGameState(nextBestMove);
};

// insipred by https://fowlie.github.io/2018/08/24/winning-algorithm-for-tic-tac-toe-using-a-3x3-magic-square/
const getMove = (selectedSquares, availableSquares) => {
	for (var i = 0; i < availableSquares.length; i++) {
		for (var j = 0; j < selectedSquares.length; j++) {
			for (var k = j + 1; k < selectedSquares.length; k++) {
				if (availableSquares[i] + selectedSquares[j] + selectedSquares[k] === 15) {
					return availableSquares[i];
				}
			}
		}
	}
	return 0;
};

const getNextBestMove = (availableSquares) => {
	const centerSquare = availableSquares.find((s) => s === 5);
	if (centerSquare) return centerSquare;
	const cornerSquares = availableSquares.filter((s) => s % 2 === 0);
	const cornerSquare = Math.floor(Math.random() * cornerSquares.length);
	if (cornerSquare >= 0 && cornerSquares.length > 2) return cornerSquares[cornerSquare];
	return availableSquares[Math.floor(Math.random() * availableSquares.length)];
};
