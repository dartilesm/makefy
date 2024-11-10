import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "client/client": "src/client/client.ts",
    "client/server": "src/client/server.ts",
    "client/admin": "src/client/admin.ts",
    middleware: "src/middleware.ts",
    "types/index": "src/types/index.ts",
    "types/database": "src/types/database.ts",
    "types/supabase": "src/types/supabase.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  sourcemap: true,
  minify: true,
  outDir: "dist",
  external: ["next/headers", "@supabase/ssr", "@supabase/supabase-js"],
  noExternal: ["@makify/supabase"],
});
