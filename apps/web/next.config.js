/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    }
  },
  transpilePackages: ['@makefy/ui'],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
