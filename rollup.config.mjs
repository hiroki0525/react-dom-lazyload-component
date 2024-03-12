import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import tsConfigJson from './tsconfig.json' assert { type: 'json' };
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const name = 'ReactDomLazyloadComponent';
const input = 'src/index.tsx';
const outputFormats = ['cjs', 'es'];

const buildTsConfig = ({ sourceMap }) => {
  const extraConfig = { compilerOptions: { sourceMap } };
  return typescript({ ...tsConfigJson, ...extraConfig });
};

const productionConfigs = outputFormats.map(format => ({
  input,
  output: [
    {
      file: format === 'es' ? 'dist/index.js' : `dist/${format}/index.js`,
      format,
      sourcemap: tsConfigJson.compilerOptions.sourceMap,
      name,
      compact: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    buildTsConfig({
      sourceMap: tsConfigJson.compilerOptions.sourceMap,
    }),
    terser(),
  ],
}));

const developmentConfigs = outputFormats.map(format => ({
  input,
  output: [
    {
      file:
        format === 'es'
          ? 'dist/index.development.js'
          : `dist/${format}/index.development.js`,
      format,
      name,
    },
  ],
  plugins: [peerDepsExternal(), buildTsConfig({ sourceMap: false })],
}));

export default [...productionConfigs, ...developmentConfigs];
