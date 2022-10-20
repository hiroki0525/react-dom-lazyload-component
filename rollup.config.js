const typescript = require('@rollup/plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
const packageJson = require('./package.json');
const { minify } = require('rollup-plugin-swc3');

module.exports = {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      name: 'react-lib',
      compact: true,
    },
  ],
  plugins: [external(), typescript(), minify()],
  external: ['react', 'react-dom'],
};
