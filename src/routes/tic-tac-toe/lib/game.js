import { get } from 'svelte/store';
import { initialBoard, winner, squares, currentPlayer } from './stores';
import { makeMove } from '../lib/bot';

export function resetGame() {
	squares.set(new Map(get(initialBoard)));
	winner.set(null);
	if (get(currentPlayer) === 'O') {
		makeMove();
	}
}

export function updateGameState(key, event) {
	let localSquares = get(squares);
	const localCurrentPlayer = get(currentPlayer);
	if (get(winner) || (event && localCurrentPlayer === 'O')) {
		return;
	}
	if (!localSquares.get(key)) {
		localSquares = localSquares.set(key, localCurrentPlayer);
		winner.set(calculateWinner(localSquares));
		currentPlayer.set(localCurrentPlayer === 'X' ? 'O' : 'X');
	}

	squares.set(new Map([...localSquares]));
}

export function calculateWinner(squaresToCheck) {
	const localCurrentPlayer = get(currentPlayer);

	let currentPlayerSquares = [...squaresToCheck.keys()]
		.map((key) => {
			if (squaresToCheck.get(key) === localCurrentPlayer) {
				return key;
			}
		})
		.filter((i) => i);
	if (currentPlayerSquares.length < 3) {
		return;
	}
	/*inspired by https://fowlie.github.io/2018/08/24/winning-algorithm-for-tic-tac-toe-using-a-3x3-magic-square/  */
	for (var i = 0; i < currentPlayerSquares.length; i++) {
		for (var j = i + 1; j < currentPlayerSquares.length; j++) {
			for (var k = j + 1; k < currentPlayerSquares.length; k++) {
				if (currentPlayerSquares[i] + currentPlayerSquares[j] + currentPlayerSquares[k] === 15) {
					return `Winner is ${localCurrentPlayer}`;
				}
			}
		}
	}

	const isDraw = [...get(squares).values()].every((square) => square !== null);
	return isDraw ? "It's a draw" : null;
}

currentPlayer.subscribe((value) => {
	let localWinner = get(winner);
	if (value === 'O' && !localWinner) {
		setTimeout(() => {
			makeMove();
		}, 1200);
	}
});
