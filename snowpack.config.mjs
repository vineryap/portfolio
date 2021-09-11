export default {
  alias: {
    '~': './src',
    $apis: './src/apis',
    $components: './src/components',
    $layouts: './src/layouts',
    $stores: './src/stores',
    $styles: './src/styles',
    $utils: './src/utils',
  },
  mount:{
    src: '/src',
    public: '/public'
  },
  plugins: ['@snowpack/plugin-dotenv'],
  packageOptions: {
    rollup: {
      plugins: [
      ],
    },
  },
};
