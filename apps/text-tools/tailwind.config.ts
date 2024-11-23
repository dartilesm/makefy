import path from "path";
import type { Config } from "tailwindcss";
import { default as uiTailwindConfig } from "@makefy/ui/tailwind.config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Makefy ui components
    path.join(
      path.dirname(require.resolve("@makefy/ui")),
      "components/**/*.{ts,tsx}",
    ),
  ],
  presets: [uiTailwindConfig],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
