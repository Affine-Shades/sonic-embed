import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const vitestConfig: VitestUserConfigInterface = {
  test: {
    environment: "happy-dom",
  },
};

export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,  
});