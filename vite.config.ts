
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Configure explicit path for uuid to ensure consistent resolution
      "uuid": path.resolve(__dirname, "node_modules/uuid/dist/esm-browser/index.js")
    },
  },
  optimizeDeps: {
    include: ['uuid'] // Force pre-bundling of uuid
  },
}));
