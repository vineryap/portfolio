import { defineConfig, transform } from "windicss/helpers";
import typography from "windicss/plugin/typography";
import filters from "windicss/plugin/filters";
import form from "windicss/plugin/forms";
import aspectRatio from "windicss/plugin/aspect-ratio";
import lineClamp from "windicss/plugin/line-clamp";

export default defineConfig({
  extract: {
    include: ["src/**/*.{html,astro,vue,jsx,tsx,svelte}"],
  },
  theme: {
    extend: {
      transitionProperty: {
        filter: "filter",
        "backdrop-filter": "backdrop-filter",
        height: 'height',
      },
    },
  },
  plugins: [
    transform("daisyui"),
    typography,
    filters,
    form,
    aspectRatio,
    lineClamp,
  ],
  daisyui: {
    themes: [
      {
        darktheme: {
          /* your theme name */ primary: "#1098f7" /* Primary color */,
          "primary-focus": "#0e89de" /* Primary color - focused */,
          "primary-content":
            "#ffffff" /* Foreground content color to use on primary color */,

          secondary: "#fcbf49" /* Secondary color */,
          "secondary-focus": "#e3ac42" /* Secondary color - focused */,
          "secondary-content":
            "#ffffff" /* Foreground content color to use on secondary color */,

          accent: "#499167" /* Accent color */,
          "accent-focus": "#42835d" /* Accent color - focused */,
          "accent-content":
            "#ffffff" /* Foreground content color to use on accent color */,

          neutral: "#002233" /* Neutral color */,
          "neutral-focus": "#001d2c" /* Neutral color - focused */,
          "neutral-content":
            "#ffffff" /* Foreground content color to use on neutral color */,

          "base-100":
            "#003049" /* Base color of page, used for blank backgrounds */,
          "base-200": "#00263a" /* Base color, a little darker */,
          "base-300": "#001d2c" /* Base color, even more darker */,
          "base-content":
            "#ffffff" /* Foreground content color to use on base color */,

          info: "#2094f3" /* Info */,
          success: "#009485" /* Success */,
          warning: "#ff9900" /* Warning */,
          error: "#ff5724" /* Error */,
        },
        lighttheme: {
          /* your theme name */ primary: "#3d405b" /* Primary color */,
          "primary-focus": "#313349" /* Primary color - focused */,
          "primary-content":
            "#ffffff" /* Foreground content color to use on primary color */,

          secondary: "#81b29a" /* Secondary color */,
          "secondary-focus": "#678e7b" /* Secondary color - focused */,
          "secondary-content":
            "#ffffff" /* Foreground content color to use on secondary color */,

          accent: "#e07a5f" /* Accent color */,
          "accent-focus": "#b3624c" /* Accent color - focused */,
          "accent-content":
            "#ffffff" /* Foreground content color to use on accent color */,

          neutral: "#3d405b" /* Neutral color */,
          "neutral-focus": "#313349" /* Neutral color - focused */,
          "neutral-content":
            "#ffffff" /* Foreground content color to use on neutral color */,

          "base-100":
            "#fbf9f2" /* Base color of page, used for blank backgrounds */,
          "base-200": "#dcd9c8" /* Base color, a little darker */,
          "base-300": "#c3c1b2" /* Base color, even more darker */,
          "base-content":
            "#30291d" /* Foreground content color to use on base color */,

          info: "#2094f3" /* Info */,
          success: "#009485" /* Success */,
          warning: "#ff9900" /* Warning */,
          error: "#ff5724" /* Error */,
        },
      },
    ],
  },
});
