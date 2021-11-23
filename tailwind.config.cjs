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
      gray: {
        light: '#EFF1F3',
        DEFAULT: '#ABB6C0',
        dark:'#68798A',
        darker: '#1A1A1D'
      },
      red: "#B70000",
      blue: {
        light: '#33E4FF',
        DEFAULT: '#009FB7',
        dark: '#00778A'
      },
      yellow: {
        light: '#FEDD7A',
        DEFAULT: '#FECD3A',
        dark: '#DEA701',
      },
      green: {
        DEFAULT: '#00B746'
      },
      white: colors.white
    }
  }
}
