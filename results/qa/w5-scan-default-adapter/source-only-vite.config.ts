import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(),tailwindcss()], resolve: {dedupe:['react','react-dom']}, server: {port: 4193, strictPort:true, fs:{allow:['/Users/donbeave/Projects/donbeave/foglamp-design-system','/var/folders/rh/g7f6gp9n77bdbj0w10kt8_hw0000gn/T/foglamp-scan-default-5v4dnf0c']}} });