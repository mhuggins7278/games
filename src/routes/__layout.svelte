<script>
	import Nav from '../components/nav.svelte';
</script>

<div class="text-gray-900 font-mono flex flex-col h-screen bg-gray-50">
		<Nav />
		<main class="px-6 flex-1">
			<slot />
		</main>
	<footer class="px-6 py-6 text-center">
		<a rel="external" target="_blank" href="https://github.com/mhuggins7278"
			>https://github.com/mhuggins7278</a
		>
	</footer>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
