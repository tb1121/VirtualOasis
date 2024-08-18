const mod =  {
  reactStrictMode: false,
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

export default mod