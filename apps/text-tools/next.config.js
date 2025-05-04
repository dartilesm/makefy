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
    transpilePackages: ['@makefy/ui', '@makefy/supabase'],
    reactStrictMode: false
};

module.exports = nextConfig
