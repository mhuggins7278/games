<script context="module">
  import Board from './components/Board.svelte';
  import { createBoard } from './lib/game';
  import { result, flagsLeft } from './lib/stores';
</script>

<svelte:head>
  <title>MineSweeper</title>
</svelte:head>

<p class="justify-center align-center flex mb-4 text-xs">
  To toggle a flag either right click or click and hold if using a touch screen.
</p>
<p />
<Board />
<div class="flex justify-center align-center">
  <div class="flex flex-col mt-8 justify-center align-center ">
    <div>Flags left: {$flagsLeft}</div>
    <div on:click={createBoard} class="mx-auto mt-4 text-6xl">{$result}</div>
  </div>
</div>
