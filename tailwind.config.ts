import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00A3FF", // Based on the blue in the design
                secondary: "#FFB020", // The orange
                success: "#00C48C", // The green
                danger: "#FF3636", // The red
            }
        },
    },
    plugins: [],
};
export default config;
