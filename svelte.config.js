import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-netlify'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    target: '#svelte',
    adapter: adapter(),
  }
}

export default config
