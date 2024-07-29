import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import { addDynamicIconSelectors } from "@iconify/tailwind";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dashboard_dark: "#191D24",
        widget_dark: "#232935",
        widget_title: "#232935",
        primary_text_dark: "#EFF7FF",
        secondary_text_dark: "#DADFE9",
        accent_color_dark: "#9EF09E",
        chart_lime_dark: "#9EF09E",
        chart_sky_dark: "#5566FC",
        chart_blueish_dark: "#92B0FF",
        chart_yellow_dark: "#F5DC71",
        chart_orange_dark: "#FF9C41",
        chart_pink_dark: "#F55077",
        semantic_green_dark: "#51CD37",
        semantic_orange_dark: "#FF5005",
        // Light theme colors
        dashboard_light: "#F2F8F7",
        widget_light: "#FFFFFF",
        widget_title_light: "#E5F8F6",
        primary_text_light: "#324947",
        secondary_text_light: "#D6F5F2",
        accent_color_light: "#22867E",
        chart_sunrise_light: "#FF9705",
        chart_brown_light: "#C06944",
        chart_alga_light: "#324947",
        chart_emerald_light: "#22867E",
        chart_pastelBlue_light: "#B2ECE7",
        chart_beige_light: "#EDE0CF",
        semantic_green_light: "#45E18D",
        semantic_red_light: "#F8656E",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [forms, addDynamicIconSelectors()],
} satisfies Config;

export default config;
