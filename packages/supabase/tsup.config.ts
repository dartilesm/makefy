import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client/client.ts", "src/client/server.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  sourcemap: true,
  minify: true,
  outDir: "dist",
});
