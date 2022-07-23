const webpack = require('webpack')

module.exports = {
  distDir: 'dist',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.plugins.push(new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }))
    config.plugins.push(new webpack.ProvidePlugin({
      process: 'process/browser',
    }))
    config.resolve.fallback = {
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "os": require.resolve("os-browserify/browser"),
      "buffer": require.resolve("buffer")
    }
    return config
  }
}
