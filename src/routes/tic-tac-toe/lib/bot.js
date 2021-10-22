export const makeMove = (squares) => {
	const availableSquares = [...squares.keys()].filter((key) => !squares.get(key));
	if (!availableSquares.length) return;
	if (availableSquares.length === 1) return availableSquares[0];

	const otherPlayersSquares = [...squares.keys()].filter((key) => squares.get(key) === 'X');
	const mySquares = [...squares.keys()].filter((key) => squares.get(key) === 'O');

	const winningMove = getMove(mySquares, availableSquares);
	if (winningMove) return winningMove;
	const blockingMove = getMove(otherPlayersSquares, availableSquares);
	if (blockingMove) return blockingMove;
	return getNextBestMove(availableSquares);
};

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
	let nextMove = availableSquares.find((s) => s === 5);
	if (nextMove) return nextMove;
	nextMove = availableSquares.find((s) => s % 2 === 0);
	if (nextMove) return nextMove;
	return availableSquares[0];
};
