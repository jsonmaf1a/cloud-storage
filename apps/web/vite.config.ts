import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tsConfigPaths(), TanStackRouterVite()],
        clearScreen: false,
        server: {
            proxy: {
                "/api": {
                    target: env.API_URL,
                    changeOrigin: true,
                },
            },
            port: Number.parseInt(env.APP_PORT),
            strictPort: true,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});
