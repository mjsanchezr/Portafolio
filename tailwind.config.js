/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                dark: {
                    900: '#0a0a0f',
                    800: '#12121a',
                    700: '#1a1a28',
                    600: '#222236',
                },
                accent: {
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                }
            },
            animation: {
                'gradient-x': 'gradient-x 8s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'glow': {
                    'from': { 'box-shadow': '0 0 10px #6366f1, 0 0 20px #6366f1' },
                    'to': { 'box-shadow': '0 0 20px #6366f1, 0 0 40px #6366f1' },
                }
            },
            backgroundSize: {
                '300%': '300%',
            },
        },
    },
    plugins: [],
}
