const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    colors: {
      ...colors,
      'brand-background': '#f2f3f5',
      'brand-gray-line': '#dcdde0',
      'brand-text': '#666666',
      'brand-text-highlight': '#b3b9ff',
      'brand-title': '#2e384d',

      'brand-white': '#fff',
      'brand-red': '#e83f5b',
      'brand-green': '#4cd62b',
      'brand-blue-100': '#b3b9ff',
      'brand-blue-200': '#5965e0',
      'brand-blue-300': '#4953b8',
      'brand-blue-twitter': '#2aa9e0',
      'brand-gray-100': '#f0f1f3',
    },

    fill: theme => theme('colors'),
    textColor: theme => theme('colors'),
    placeholderColor: theme => theme('colors'),
    backgroundColor: theme => theme('colors'),

    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      rajdhani: ['Rajdhani'],
    },
  },

  variants: {
    extend: {
      backgroundColor: ['focus', 'hover'],
      borderColor: ['focus', 'hover'],
    },
  },

  plugins: [],
};
