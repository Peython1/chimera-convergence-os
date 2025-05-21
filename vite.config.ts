
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
      // Use a more flexible path for uuid that doesn't depend on specific file structure
      "uuid": path.resolve(__dirname, "node_modules/uuid")
    },
  },
  optimizeDeps: {
    include: ['uuid'] // Force pre-bundling of uuid
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
}));
