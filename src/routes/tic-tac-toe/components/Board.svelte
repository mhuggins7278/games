<script>
	import Square from './Square.svelte';
	import { makeMove } from '../lib/bot';
	import { scale } from 'svelte/transition';
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

	$: {
		if (currentPlayer === 'O' && !winner) {
			setTimeout(() => {
				const nextMove = makeMove(squares);
				if (nextMove) squares.set(nextMove, currentPlayer);
				winner = calculateWinner(squares);

				currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
				squares = new Map([...squares]);
			}, 800);
		}
	}

	async function squareClickHandler(key) {
		if (winner || currentPlayer === 'O') {
			return;
		}
		if (!squares.get(key)) {
			squares.set(key, currentPlayer);
			winner = calculateWinner(squares);
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		}

		squares = new Map([...squares]);
	}
	function calculateWinner(squaresToCheck) {
		let currentPlayerSquares = [...squaresToCheck.keys()]
			.map((key) => {
				if (squaresToCheck.get(key) === currentPlayer) {
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
	{#if winner}
		<h3 class="my-6" in:scale={{ duration: 1000 }}>{winner}</h3>
	{:else}
		<h3 class="my-6" in:scale={{ duration: 1000 }}>{status}</h3>
	{/if}
	<div class="grid gap-1 grid-rows-3 grid-cols-3 bg-gray-200 place-items-center">
		{#each [...squares] as [key, owner]}
			<Square value={owner} handleClick={() => squareClickHandler(key)} />
		{/each}
	</div>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-12"
		on:click={resetGame}>RESET</button
	>
</div>
