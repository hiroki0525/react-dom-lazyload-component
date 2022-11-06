const typescript = require('@rollup/plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
const packageJson = require('./package.json');
const terser = require('@rollup/plugin-terser');

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
  plugins: [external(), typescript(), terser()],
  external: ['react', 'react-dom'],
};
