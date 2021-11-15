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
      animation: {
        gradient: 'gradient 5s ease infinite'
      },
      boxShadow: {},
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
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      zIndex: {
        '-10': '-10'
      },
      outline: {
        // primary: '2px solid #26aeb9',
        // secondary: '2px solid #609f81',
        // accent: '2px solid #d64d29',
        // neutral: '2px solid #4d4d4d',
        // 'base-200': '2px solid #f3edd8',
        // 'base-300': '2px solid #e3d5a4'
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
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2CA6A4' /* Primary color */,
          'primary-focus': '#338A89' /* Primary color - focused */,
          'primary-content': '#ffffff' /* Foreground content color to use on primary color */,

          secondary: '#93827F' /* Secondary color */,
          'secondary-focus': '#847573' /* Secondary color - focused */,
          'secondary-content': '#ffffff' /* Foreground content color to use on secondary color */,

          accent: '#D8961D' /* Accent color */,
          'accent-focus': '#FAA916' /* Accent color - focused */,
          'accent-content': '#000000' /* Foreground content color to use on accent color */,

          neutral: '#1E2D2F' /* Neutral color */,
          'neutral-focus': '#1D2729' /* Neutral color - focused */,
          'neutral-content': '#ffffff' /* Foreground content color to use on neutral color */,

          'base-100': '#fbf9f2' /* Base color of page, used for blank backgrounds */,
          'base-200': '#f3edd8' /* Base color, a little darker */,
          'base-300': '#e3d5a4' /* Base color, even more darker */,
          'base-content': '#1f2937' /* Foreground content color to use on base color */,

          info: '#2094f3' /* Info */,
          success: '#009485' /* Success */,
          warning: '#ff9900' /* Warning */,
          error: '#ff5724' /* Error */
        }
      }
    ]
  }
};
