import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import purgecss from 'vite-plugin-purgecss'

export default defineConfig({
    plugins: [
        react(),
        purgecss({
            content: ['./index.html', './src/**/*.{js,jsx}'],
            safelist: {
                standard: [
                    'html',
                    'body',
                    /^fade/,
                    /^show$/,
                    /^modal/,
                    /^btn/,
                    /^dropdown/,
                    /^nav/,
                    /^card/,
                    /^table/,
                    'active',
                    'collapsed',
                    'collapse',
                    'show',
                ],
                deep: [
                    /dropdown-menu$/,
                    /modal$/,
                    /fade$/,
                    /show$/,
                    /^nav-/,
                    /^navbar-/,
                    /^card-/,
                    /^btn-/,
                    /^table-/
                ],
                greedy: [
                    /^modal-/,
                    /^btn-/,
                    /^nav-/,
                    /^navbar-/,
                    /^card-/,
                    /^table-/,
                    /^show$/,
                    /^active$/,
                    /^fade$/,
                    /^collapse$/
                ]
            }
        })
    ],
    build: {
        assetsInlineLimit: 0,
        cssMinify: true,
        cssCodeSplit: true
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
})