import type { Config } from "tailwindcss";

const config: Config = {


  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
	main: {
	  primary: "#FA4D54",
	  accent: "#DC143C",
	  not_active: "#E64449",
	  secondary: "#262626",
	  black: "#111111",
	  gray: "#f3f3f3",
	}
      },
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
