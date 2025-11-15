import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  server: {
    host: "127.0.0.1", // 👈 use IPv4
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // 👈 match IPv4
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
