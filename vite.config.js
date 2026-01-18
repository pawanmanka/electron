import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',                 // ⭐ REQUIRED
    plugins: [react()],
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});
