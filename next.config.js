/** @type {import('next').NextConfig} */
const nextConfig = {}
// const withNextIntl = require('next-intl/plugin')();

module.exports = nextConfig
// module.exports = withNextIntl({
//     // Other Next.js configuration ...
// });
// next.config.js
module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.html$/,
            use: 'html-loader',
        });
        return config;
    },
};
