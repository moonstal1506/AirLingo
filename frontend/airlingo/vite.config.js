/* eslint-disable */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        svgr(),
        eslintPlugin({
            cache: false,
        }),
    ],
    server: {
        // host: true,
        proxy: {
            "/api": "https://glosbe.com",
            // "/api": {
            //     target: "https://glosbe.com",
            //     changeOrigin: true,
            //     secure: false,
            //     rewrite: (path) => path.replace(/^\/api/, ""),
            // }
        },

    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
