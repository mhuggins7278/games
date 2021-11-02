<script>
	import Nav from '../components/nav.svelte';
</script>

<div class="p-8 max-w-6xl mx-auto body font-mono min-h-screen">
	<Nav />
	<div class="flex flex-col justify-center w-full flex-auto">
		<slot  />
	</div>
  <footer class="absolute bottom-0 h-16 ml-96">
    <a rel="external" target="_blank" href="https://github.com/mhuggins7278">https://github.com/mhuggins7278<a/>
  </footer>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
