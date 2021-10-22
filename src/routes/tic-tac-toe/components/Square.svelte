<script>
	import {} from 'svelte/animate';
	export let value;
	export let handleClick;
</script>

<button class="text-center w-16 h-16 bg-white" on:click={handleClick}>{value || ''}</button>
