import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from 'path'
import * as fs from "node:fs";
import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(packageJson.version),
    },
    plugins: [
        react(),
        tailwindcss(),
    ],
    publicDir: 'public',
    build: {
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'state-management': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
                    'ui-libs': ['@headlessui/react', '@heroicons/react', 'framer-motion'],
                    'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
                },
                assetFileNames: 'assets/[name]-[hash].[ext]',
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
            },
            plugins: [{
                name: 'copy-htaccess',
                generateBundle() {
                    try {
                        const htaccessContent = fs.readFileSync('static/.htaccess', 'utf-8');
                        this.emitFile({
                            type: 'asset',
                            fileName: '.htaccess',
                            source: htaccessContent
                        });
                    } catch (_error) {
                        console.warn('.htaccess not found in static/, skipping');
                    }
                }
            }]
        },
        assetsInlineLimit: 4096,
        copyPublicDir: true
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            '@headlessui/react',
            'framer-motion'
        ]
    },
    server: {
        host: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './public/assets')
        }
    }
})
