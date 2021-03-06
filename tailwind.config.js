const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      transparent: 'transparent',
    }),
    fill: theme => ({
      white: theme('colors.white'),
      blue: theme('colors.blue'),
    }),
    colors: {
      transparent: {
        DEFAULT: 'transparent',
      },
      white: {
        DEFAULT: '#FFFFFF',
        100: '#F2F3F5',
      },
      red: colors.red,
      green: colors.green,
      gray: {
        DEFAULT: '#dcdde0',
        100: '#d7d8da',
      },
      blue: {
        DEFAULT: '#5965e0',
        light: '#2aa9e0',
        dark: '#4953b8',
        'dark-1': '#414AA3',
      },
    },
    textColor: {
      ...colors,
      black: '#2E384D',
      white: '#fff',
      gray: '#666666',
      blue: '#b3b9ff',
      'blue-100': '#5965e0',
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
