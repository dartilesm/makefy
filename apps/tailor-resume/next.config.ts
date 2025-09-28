import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Add a rule for webpack to handle SVG files using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  transpilePackages: ["@makefy/ui", "@makefy/supabase"],
  reactStrictMode: false,
};

export default nextConfig;
