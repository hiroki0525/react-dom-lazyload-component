const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
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
      {
        test: /\.(jpg|png|ico)$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      examples: path.resolve(__dirname, 'src/'),
    },
  },
  target: ['web', 'es6'],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: './index.html',
    }),
  ],
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

module.exports = (env, argv) => {
  // process.env.NODE_ENV is undefined, so use argv.mode.
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(
        argv.mode === 'production' ? '/react-dom-lazyload-component' : ''
      ),
    })
  );
  return config;
};
