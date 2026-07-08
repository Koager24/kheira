// Erzeugt eine einzelne, eigenständige HTML-Datei (dist-preview/index.html),
// die ohne Server direkt im Browser geöffnet werden kann. Bilder werden als
// Base64 eingebettet.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "./",
  build: { outDir: "dist-preview", assetsInlineLimit: 100_000_000 },
});
