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
        host: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
