/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'theme-color': 'var(--theme-color)',
                'bg-secondary-color': 'var(--bg-secondary-color)',
                'bg-additional-color': 'var(--bg-additional-color)',
                'border-color': 'var(--border-color)',
                'main-text-color': 'var(--main-text-color)',
                'secondary-text-color': 'var(--secondary-text-color)',
            },
        },
    },
    plugins: [],
};
