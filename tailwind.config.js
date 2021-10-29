const { neutral } = require('daisyui/colors/colorNames');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
    options: {
      keyframes: true
    }
  },
  theme: {
    extend: {
      colors: {
        primary: '#26aeb9',
        'primary-focus': '#1b7c84',
        'primary-content': '#ffffff',
        secondary: '#609f81',
        'secondary-focus': '#3a5f4d',
        'secondary-content': '#ffffff',
        accent: '#d64d29',
        'accent-focus': '#802e19',
        'accent-content': '#ffffff',
        neutral: '#4d4d4d',
        'neutral-focus': '#1a1a1a',
        'neutral-content': '#ffffff',
        base: {
          100: '#fbf9f2',
          200: '#f3edd8',
          300: '#e3d5a4'
        }
      },
      transitionProperty: {
        filter: 'filter',
        'backdrop-filter': 'backdrop-filter',
        height: 'height',
        'max-height': 'max-height',
        width: 'width',
        display: 'display',
        border: 'border'
      },
      keyframes: {
        gradient: {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }
        }
      },
      animation: {
        gradient: 'gradient 5s ease infinite'
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      zIndex: {
        '-10': '-10'
      },
      outline: {
        primary: '2px solid #26aeb9',
        secondary: '2px solid #609f81',
        accent: '2px solid #d64d29',
        neutral: '2px solid #4d4d4d',
        'base-200': '2px solid #f3edd8',
        'base-300': '2px solid #e3d5a4'
      }
    }
  },
  variants: {
    extend: {
      transitionProperty: ['hover', 'focus'],
      margin: ['odd', 'even', 'last']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require("@tailwindcss/forms"),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui')
  ]
};
