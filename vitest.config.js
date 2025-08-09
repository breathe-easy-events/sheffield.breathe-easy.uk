import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  test: {
    environment: "happy-dom",
    include: [
      "./eleventy.test.ts",
      "./src/**/*.test.tsx",
      "./src/**/*.test.ts",
    ],
  },
});
