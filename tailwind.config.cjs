const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.svelte"],
}


module.exports = {
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.blueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.yellow,
      green: colors.green
    }
  }
}
