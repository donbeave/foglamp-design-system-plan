import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({plugins:[react(),tailwindcss()],resolve:{alias:{'sonner':'/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/node_modules/sonner/dist/index.mjs','next-themes':'/Users/donbeave/Projects/donbeave/foglamp-design-system/packages/design-system/node_modules/next-themes/dist/index.mjs'},dedupe:['react','react-dom']},server:{fs:{allow:['/Users/donbeave/Projects/donbeave/foglamp-design-system','/tmp/w5-callback-fixture']}}});
