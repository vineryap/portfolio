export default {
  alias: {},
  plugins: ['@snowpack/plugin-dotenv', '@snowpack/plugin-postcss'],
  env: {},
  packageOptions: {
    knownEntrypoints: ['svelte/easing', 'astro/debug'],
    rollup: {
      plugins: []
    }
  },
  buildOptions: {},
  optimize: {
    target: 'safari11'
  }
};
