const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'index.html'),
  filename: './index.html',
});

module.exports = {
  entry: path.join(__dirname, 'index.tsx'),
  output: {
    path: `${__dirname}/dist/`,
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // {
      //   test: /\.(jpg|png|ico)$/,
      //   use: 'url-loader',
      // },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: ['web', 'es6'],
  plugins: [htmlWebpackPlugin],
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/*/, to: '/index.html' }],
    },
  },
};
