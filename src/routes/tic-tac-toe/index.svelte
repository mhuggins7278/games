<script>
	import Board from './components/Board.svelte';
	import { record } from './lib/stores';
</script>
<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>Tic Tac Toe</title>
</svelte:head>
<Board />

<div class="mt-4 flex flex-row justify-center">
	<ul class="flex">
		<li class="mr-4">Wins: {$record.wins || 0}</li>
		<li class="mr-4">Losses: {$record.losses || 0}</li>
		<li>Draws: {$record.draws || 0}</li>
	</ul>
</div>
