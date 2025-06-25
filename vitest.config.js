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
      "./components/**/*.test.tsx",
      "./src/**/*.test.tsx",
    ],
  },
});
