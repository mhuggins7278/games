<script context="module">
	import Board from './components/Board.svelte';
	import { result, flagsLeft } from './lib/stores';
</script>

<script>
</script>

<svelte:head>
	<title>MineSweeper</title>
</svelte:head>

<Board />
<div class="flex justify-center align-center">
	<div class="flex flex-col mt-8 justify-center align-center ">
		<div>Flags left: {$flagsLeft}</div>
		<div>{$result}</div>
	</div>
</div>
