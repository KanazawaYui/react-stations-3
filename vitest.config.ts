import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // DOM環境で実行
    setupFiles: ["./setupTests.js"], // グローバルマッチャーを読み込む
  },
});
