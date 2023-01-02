import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import packageJson from './package.json';
import terser from '@rollup/plugin-terser';

export default {
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
