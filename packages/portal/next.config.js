const webpack = require('webpack')

const { TARGET } = process.env
const ENV = process.env.NODE_ENV || 'development'
const isDebug = ENV !== 'production'

module.exports = {
  distDir: 'dist',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __ENV__: `'${TARGET || 'development'}'`,
    }))
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
