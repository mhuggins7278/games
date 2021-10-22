<script>
	import Square from './Square.svelte';
	const initialBoard2 = new Map([
		[2, null],
		[7, null],
		[6, null],
		[9, null],
		[5, null],
		[1, null],
		[4, null],
		[3, null],
		[8, null]
	]);

	let squares = new Map(initialBoard2);
	let winner = null;

	let currentPlayer = 'X';

	$: status = `Next Player: ${currentPlayer}`;

	function squareClickHandler(key) {
		if (winner) {
			return;
		}
		if (!squares.get(key)) {
			squares.set(key, currentPlayer);
			winner = calculateWinner();
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		}
		squares = new Map([...squares]);
	}
	function calculateWinner() {
		let currentPlayerSquares = [...squares.keys()]
			.map((key) => {
				if (squares.get(key) === currentPlayer) {
					return key;
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

		const isDraw = [...squares.values()].every((square) => square !== null);
		return isDraw ? "It's a draw" : null;
	}

	function resetGame() {
		squares = new Map(initialBoard2);
		winner = null;
	}
</script>

<div class="text-center">
	<h3 class="my-6">{winner ? winner : status}</h3>
	<div class="grid gap-1 grid-rows-3 grid-cols-3 bg-gray-200">
		{#each [...squares] as [key, owner]}
			<Square value={owner} handleClick={() => squareClickHandler(key)} />
		{/each}
	</div>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-12"
		on:click={resetGame}>RESET</button
	>
</div>
