<script>
	import Nav from '../components/nav.svelte';
</script>

<div class="p-8 max-w-6xl mx-auto body font-mono">
	<Nav />
	<div class="flex justify-center w-full">
		<slot />
	</div>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
