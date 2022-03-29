const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// HTMLファイルのビルド設定
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'examples/index.html'),
  filename: './index.html',
});

module.exports = {
  entry: path.join(__dirname, 'examples/index.tsx'),
  output: {
    path: `${__dirname}/dist/examples`,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  target: ['web', 'es5'],
  plugins: [htmlWebpackPlugin],
  devServer: {
    port: 3001,
  },
};
