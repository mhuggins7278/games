<script>
	import Square from './Square.svelte';
	import { winner, status, squares } from '../lib/stores';
	import { resetGame, updateGameState } from '../lib/game';
	import { scale } from 'svelte/transition';
</script>

<div class="text-center">
	{#if $winner}
		<h3 class="my-6" in:scale={{ duration: 1000 }}>{$winner}</h3>
	{:else}
		<h3 class="my-6" in:scale={{ duration: 1000 }}>{$status}</h3>
	{/if}
	<div class="flex flex-row justify-center">
		<div class="shadow-2xl grid gap-1 grid-rows-3 grid-cols-3 bg-gray-300 place-items-center">
			{#each [...$squares] as [key, owner]}
				<Square value={owner} handleClick={event => updateGameState(key, event)} />
			{/each}
		</div>
	</div>
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-12"
			on:click={resetGame}>RESET</button
		>
</div>
