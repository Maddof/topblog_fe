import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "topblogfe-production.up.railway.app", // Set this to '/' or the root URL where your app will be hosted
});
