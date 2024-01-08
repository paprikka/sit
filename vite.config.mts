import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      manifest: {
        background_color: "#000000",
        description:
          "Share with a friend who needs to sit the fuck down or enjoy the experience yourself.",
        name: "Sit.",
        orientation: "portrait",
        theme_color: "#000000",
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
