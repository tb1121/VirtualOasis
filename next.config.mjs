export default {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      loader: 'url-loader',
    });

    return config;
  },
};
