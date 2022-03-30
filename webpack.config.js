const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.tsx'),
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  target: ['web', 'es6'],
};
