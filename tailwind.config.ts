import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F1E3D',
          hover: '#1A305E',
        },
        accent: {
          DEFAULT: '#C9A227',
          hover: '#E8BF3A',
        },
        background: {
          light: '#F5F7FA',
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(201, 162, 39, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
