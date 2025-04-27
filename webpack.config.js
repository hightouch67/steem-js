const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  entry: {
    steem: path.join(__dirname, 'src/browser.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    library: {
      name: 'steem',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
  },
  plugins: [
    ...(process.env.NODE_ENV === 'production' ? [
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },
  resolve: {
    fallback: {
      "assert": require.resolve("assert/"),
      "crypto": false,
      "stream": false,
      "buffer": require.resolve("buffer/"),
      "process": require.resolve("process/browser"),
    }
  }
}; 