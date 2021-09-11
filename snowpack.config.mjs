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
  plugins: ['@snowpack/plugin-dotenv'],
  packageOptions: {
    rollup: {
      plugins: [
      ],
    },
  },
};
