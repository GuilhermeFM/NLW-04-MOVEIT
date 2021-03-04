const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      transparent: 'transparent',
    }),
    colors: {
      green: colors.green,
      blue: {
        DEFAULT: '#5965e0',
        light: '#2aa9e0',
        dark: '#4953b8',
        'dark-1': '#414AA3',
      },
    },
    textColor: {
      white: '#fff',
      gray: '#666666',
      blue: '#b3b9ff',
    },
    placeholderColor: {
      white: '#fff',
      gray: '#666666',
      blue: '#b3b9ff',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      rajdhani: ['Rajdhani'],
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['focus', 'hover', 'disabled'],
      borderColor: ['focus', 'hover', 'disabled'],
    },
  },
  plugins: [],
};
