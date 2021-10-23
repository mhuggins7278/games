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
   const centerSquare = availableSquares.find(s => s === 5)
   if (centerSquare) return centerSquare;
   const cornerSquares = availableSquares.filter(s => s % 2 === 0)
	 const cornerSquare = Math.floor(Math.random() * cornerSquares.length)
   if (cornerSquare >= 0) return cornerSquares[cornerSquare];
	 return availableSquares[Math.floor(Math.random() * availableSquares.length)];
};
