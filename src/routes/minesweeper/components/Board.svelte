<script>
	import { width, board } from '../lib/stores';
	import Square from './Square.svelte';
	import { createBoard } from '../lib/game';

	createBoard();
</script>

<div class="flex flex-row justify-center">
	<div class={`shadow-2xl grid grid-cols-${$width} place-items-center`}>
		{#each $board as square (square.id)}
			<Square {square} />
		{/each}
	</div>
</div>
