<script>
	import {
		width,
		bombAmount,
		flags,
		isGameOver,
		bombsArray,
		emptyArray,
		gameArray,
		shuffledArray,
		board,
		flagsLeft,
		result
	} from '../lib/stores';

	function handleClick(square, event) {
		//if the game is over or the square was already clicked return
		if ($isGameOver || square.checked || square.flag) return;
		//if the function was called from checkNeighbouringSquares and the value is a bomb return
		if (!event && square.value === 'bomb') return;
		const localBoard = [...$board];

		if (square.value === 'valid') {
			localBoard[square.id].displayValue = square.count;
			localBoard[square.id].checked = true;
			$board = [...localBoard];
			//only recurse if the square has no adjecent bombs
			if (square.count === 0) checkNeighbouringSquares(square);
		} else {
			bombClicked();
		}
	}

	function bombClicked() {
		$result = 'BOOM! Game Over!';
		$isGameOver = true;

		//show ALL the bombs
		$board = [
			...$board.map(square => {
				if (square.value === 'bomb') {
					square.displayValue = '💣';
				}
				return square;
			})
		];
	}

	function checkNeighbouringSquares(square) {
		const { id } = square;
		const isLeftEdge = id % $width === 0;
		const isRightEdge = id % $width === $width - 1;

		setTimeout(() => {
			if (id > 0 && !isLeftEdge) {
				const nextSquare = $board[id - 1];
				handleClick(nextSquare);
			}
			if (id > 9 && !isRightEdge) {
				const nextSquare = $board[id + 1 - $width];
				handleClick(nextSquare);
			}
			if (id > 10) {
				const nextSquare = $board[id - $width];
				handleClick(nextSquare);
			}
			if (id > 11 && !isLeftEdge) {
				const nextSquare = $board[id - 1 - $width];
				handleClick(nextSquare);
			}
			if (id < 98 && !isRightEdge) {
				const nextSquare = $board[id + 1];
				handleClick(nextSquare);
			}
			if (id < 90 && !isLeftEdge) {
				const nextSquare = $board[id - 1 + $width];
				handleClick(nextSquare);
			}
			if (id < 88 && !isRightEdge) {
				const nextSquare = $board[id + 1 + $width];
				handleClick(nextSquare);
			}
			if (id < 89) {
				const nextSquare = $board[id + $width];
				handleClick(nextSquare);
			}
		}, 10);
	}

	function createBoard() {
		//get shuffled game array with random bombs
		$bombsArray = Array($bombAmount).fill('bomb');
		$emptyArray = Array($width * $width - $bombAmount).fill('valid');
		$gameArray = [...$emptyArray, ...$bombsArray];
		$shuffledArray = $gameArray.sort(() => Math.random() - 0.5);

		$board = $shuffledArray.map((item, index, originalArray) => {
			let total = 0;
			const isLeftEdge = index % $width === 0;
			const isRightEdge = index % $width === $width - 1;

			//set the count of the number of bombs that touch the current square
			if (item === 'valid') {
				if (index > 0 && !isLeftEdge && originalArray[index - 1] === 'bomb') total++;
				if (index > 9 && !isRightEdge && originalArray[index + 1 - $width] === 'bomb') total++;
				if (index > 10 && originalArray[index - $width] === 'bomb') total++;
				if (index > 11 && !isLeftEdge && originalArray[index - 1 - $width] === 'bomb') total++;
				if (index < 98 && !isRightEdge && originalArray[index + 1] === 'bomb') total++;
				if (index < 90 && !isLeftEdge && originalArray[index - 1 + $width] === 'bomb') total++;
				if (index < 88 && !isRightEdge && originalArray[index + 1 + $width] === 'bomb') total++;
				if (index < 89 && originalArray[index + $width] === 'bomb') total++;
			}
			return {
				id: index,
				value: item,
				count: total,
				checked: false,
				flag: false,
				displayValue: ''
			};
		});
	}
	createBoard();
</script>

<div class="flex flex-row justify-center">
	<div class={`shadow-2xl grid grid-cols-${$width} place-items-center`}>
		{#each $board as square}
			<button
				on:click={event => handleClick(square, event)}
				class="border-gray-50 border rounded shadow bg-gray-200 w-14 h-14 flex justify-center items-center"
				>{square.displayValue}</button
			>
			<!-- <Square value={owner} handleClick={event => updateGameState(key, event)} /> -->
		{/each}
	</div>
</div>
