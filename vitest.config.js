import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    // jsxInject: "import { jsx } from 'jsx-async-runtime/jsx-runtime'",
    // jsxFactory: "jsx",
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
