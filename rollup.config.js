const typescript = require('@rollup/plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
const packageJson = require('./package.json');

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
  plugins: [external(), typescript()],
  external: ['react', 'react-dom'],
};
