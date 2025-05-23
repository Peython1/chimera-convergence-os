// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      // Use a more flexible path for uuid that doesn't depend on specific file structure
      "uuid": path.resolve(__vite_injected_original_dirname, "node_modules/uuid")
    }
  },
  optimizeDeps: {
    include: ["uuid"]
    // Force pre-bundling of uuid
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  define: {
    // Provide fallbacks for environment variables at build time
    __CHIMERA_ROOT__: JSON.stringify(process.env.VITE_CHIMERA_ROOT || "/opt/chimera"),
    __RUST_TARGET__: JSON.stringify(process.env.VITE_RUST_TARGET || "x86_64-unknown-linux-gnu")
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGNvbXBvbmVudFRhZ2dlciB9IGZyb20gXCJsb3ZhYmxlLXRhZ2dlclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAvLyBVc2UgYSBtb3JlIGZsZXhpYmxlIHBhdGggZm9yIHV1aWQgdGhhdCBkb2Vzbid0IGRlcGVuZCBvbiBzcGVjaWZpYyBmaWxlIHN0cnVjdHVyZVxuICAgICAgXCJ1dWlkXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwibm9kZV9tb2R1bGVzL3V1aWRcIilcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3V1aWQnXSAvLyBGb3JjZSBwcmUtYnVuZGxpbmcgb2YgdXVpZFxuICB9LFxuICBidWlsZDoge1xuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgaW5jbHVkZTogWy9ub2RlX21vZHVsZXMvXVxuICAgIH1cbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgLy8gUHJvdmlkZSBmYWxsYmFja3MgZm9yIGVudmlyb25tZW50IHZhcmlhYmxlcyBhdCBidWlsZCB0aW1lXG4gICAgX19DSElNRVJBX1JPT1RfXzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuVklURV9DSElNRVJBX1JPT1QgfHwgJy9vcHQvY2hpbWVyYScpLFxuICAgIF9fUlVTVF9UQVJHRVRfXzogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuVklURV9SVVNUX1RBUkdFVCB8fCAneDg2XzY0LXVua25vd24tbGludXgtZ251JylcbiAgfVxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFKaEMsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQSxFQUNsQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQTtBQUFBLE1BRXBDLFFBQVEsS0FBSyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLE1BQU07QUFBQTtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxpQkFBaUI7QUFBQSxNQUNmLFNBQVMsQ0FBQyxjQUFjO0FBQUEsSUFDMUI7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQSxJQUVOLGtCQUFrQixLQUFLLFVBQVUsUUFBUSxJQUFJLHFCQUFxQixjQUFjO0FBQUEsSUFDaEYsaUJBQWlCLEtBQUssVUFBVSxRQUFRLElBQUksb0JBQW9CLDBCQUEwQjtBQUFBLEVBQzVGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
