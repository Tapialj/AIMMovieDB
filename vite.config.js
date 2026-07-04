/* eslint-disable */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import path from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "/api": path.resolve(__dirname, "./src/api"),
      "/context": path.resolve(__dirname, "./src/context"),
      "/routes": path.resolve(__dirname, "./src/routes"),
      "/hooks": path.resolve(__dirname, "./src/hooks"),
      "/modules": path.resolve(__dirname, "./src/modules"),
      "/layout": path.resolve(__dirname, "./src/layout"),
      "/pages": path.resolve(__dirname, "./src/pages"),
      "/components": path.resolve(__dirname, "./src/components"),
      "/utils": path.resolve(__dirname, "./src/utils"),
      "/assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    port: 3080,
  },
  preview: {
    port: 3080,
  },
})
