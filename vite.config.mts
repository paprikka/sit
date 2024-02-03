import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      manifest: {
        start_url: "/",
        background_color: "#000000",
        description:
          "Share with a friend who needs to sit the fuck down or enjoy the experience yourself.",
        name: "Sit.",
        short_name: "Sit.",
        orientation: "portrait",
        displayMode: "standalone",
        theme_color: "#000000",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
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
