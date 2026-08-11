import type { Config } from "tailwindcss";

/**
 * Tailwind v4: Most theme tokens are now in app/globals.css via @theme.
 * This config only specifies content scanning paths.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
