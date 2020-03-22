const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './demo/index.js',
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html|\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.ts', '.ejs'],
  }
};
