import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    /* build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'resources/js/app.jsx'),
                Feed: resolve(__dirname, 'resources/js/Pages/FeedPage/Feed.jsx'),
            },
        },
    }, */
});
