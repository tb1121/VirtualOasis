// next.config.mjs
export default {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2)$/,
      use: {
        loader: 'url-loader',
      },
    });

    return config;
  },
};
