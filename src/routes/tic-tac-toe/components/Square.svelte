<script>
	import { fly, fade, slide, scale, draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let value;
	export let handleClick;
</script>

<div class="w-16 h-16 bg-white" on:click={handleClick}>
	{#each [value] as v (v)}
		<button
			class="text-center w-16 h-16 bg-white"
			in:scale={{ duration: 500 }}
			on:click={handleClick}>{v || ''}</button
		>
	{/each}
</div>
