/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: function (config) {
        /**
         * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
         * Module parse failed: Unexpected character '�' (1:0)" error
         */
        config.resolve.alias.canvas = false;

        // You may not need this, it's just to support moduleResolution: 'node16'
        config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx'],
        };

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    transpilePackages: ['@makefy/ui', '@makefy/supabase'],
    reactStrictMode: false,
    swcMinify: true
};

module.exports = nextConfig
