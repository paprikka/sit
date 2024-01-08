import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: process.env.SW_DEV === "true",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,woff2,svg,mp3}"],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
