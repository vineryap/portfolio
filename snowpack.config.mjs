
export default {
  alias: {
    "~": "./src",
  },
  plugins: ["@snowpack/plugin-dotenv", "@snowpack/plugin-postcss"],
  packageOptions: {
    source: "local",
    rollup: {
      plugins: [],
    },
  },
};
