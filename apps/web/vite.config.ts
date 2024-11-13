import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tsConfigPaths from "vite-tsconfig-paths";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [react(), tsConfigPaths()],
    clearScreen: false,
    server: {
        port: 3000,
        strictPort: true,

        host: host || false,
        hmr: host
            ? {
                  protocol: "ws",
                  host,
                  port: 3001,
              }
            : undefined,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));
