import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "refractor/lang/scala",
      "refractor/lang/sass",
      "refractor/lang/ada",
      "refractor/lang/agda",
    ],
  },
});
