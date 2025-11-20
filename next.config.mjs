const nextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    // React95 font fix
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
