const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.tsx'),
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  externals: ['react', 'react-dom'],
  target: ['web', 'es6'],
};
