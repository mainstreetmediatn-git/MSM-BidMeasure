// Modified by Main Street Media Co. on 2026-09-08 for MSM-BidMeasure.
// Derived from OpenTakeoff by Kentucky AI and the OpenTakeoff contributors.
// Apache-2.0 license and upstream attribution are preserved in LICENSE and NOTICE.

import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The one source of truth for the app version — package.json — inlined as
// __APP_VERSION__ so contributions can carry generator_version without a
// runtime fetch. Guarded with `typeof` at the use site so the Node test
// runner (no Vite, no define) sees plain undefined instead of a crash.
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

// MSM-BidMeasure remains a client-only static app: the takeoff canvas runs in
// the browser (pdf.js + canvas + geometry libs), persists to IndexedDB /
// localStorage, and builds to static dist/. VITE_BASE_PATH lets the same build
// run at `/` locally or under the GitHub Pages `/MSM-BidMeasure/` project path.
//
// The `/ai` proxy is OPTIONAL — it only matters if you run the bring-your-own-
// model AI sandbox in `../server`. Without it, the primary takeoff app works.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  define: { __APP_VERSION__: JSON.stringify(pkg.version) },
  worker: { format: "es" },
  server: {
    port: 5173,
    proxy: {
      "/ai": {
        target: "http://localhost:8000",
        headers: process.env.OT_SANDBOX_API_KEY
          ? { "X-API-Key": process.env.OT_SANDBOX_API_KEY }
          : {},
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
