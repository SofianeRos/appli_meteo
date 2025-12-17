/**
 * configuration file for Vite
 * 1. serveur de develeloppement
 * 2. build de production
 */

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    server: {
        port: 4173,
        host: true,
    },
    preview: {
        port: 4174,
        host: true,
    },

    build: {
        outDir: 'dist', // dossier ou seront gerer les fichiers de production
        sourcemap: true,
    },
})