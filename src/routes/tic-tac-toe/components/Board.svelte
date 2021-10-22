<script>
	import Square from './Square.svelte';
	const initalBoard = [
		{ value: 2, owner: null },
		{ value: 7, owner: null },
		{ value: 6, owner: null },
		{ value: 9, owner: null },
		{ value: 5, owner: null },
		{ value: 1, owner: null },
		{ value: 4, owner: null },
		{ value: 3, owner: null },
		{ value: 8, owner: null }
	];
	let squares = [...initalBoard];
	let winner = null;

	let currentPlayer = 'X';

	$: status = `Next Player: ${currentPlayer}`;
	function squareClickHandler(key) {
		if (winner) {
			return;
		}
		squares = squares.map((square) => {
			if (square['value'] === key && !square['owner']) {
				square['owner'] = currentPlayer;
				winner = calculateWinner();
				currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			}
			return square;
		});
	}
	function calculateWinner() {
		let currentPlayerSquares = squares
			.map((square) => {
				if (square['owner'] === currentPlayer) {
					return square['value'];
				}
			})
			.filter((i) => i);
		if (currentPlayerSquares.length < 3) {
			return;
		}
		for (var i = 0; i < currentPlayerSquares.length; i++) {
			for (var j = i + 1; j < currentPlayerSquares.length; j++) {
				for (var k = j + 1; k < currentPlayerSquares.length; k++) {
					if (currentPlayerSquares[i] + currentPlayerSquares[j] + currentPlayerSquares[k] === 15) {
						return `Winner is ${currentPlayer}`;
					}
				}
			}
		}

		const isDraw = squares.every((square) => square['owner'] !== null);
		return isDraw ? "It's a draw" : null;
	}

	function resetGame() {
		squares = [...initalBoard];
		winner = null;
	}
</script>

<div class="text-center">
	<h3 class="my-6">{winner ? winner : status}</h3>

	<div class="grid gap-1 grid-rows-3 grid-cols-3 bg-gray-200">
		{#each squares as square}
			<Square value={square['owner']} handleClick={() => squareClickHandler(square['value'])} />
		{/each}
	</div>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-12"
		on:click={resetGame}>RESET</button
	>
</div>
