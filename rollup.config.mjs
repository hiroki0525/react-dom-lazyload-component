import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import tsConfigJson from './tsconfig.json' assert { type: 'json' };

const name = 'ReactDomLazyloadComponent';
const input = 'src/index.tsx';
const outputFormats = ['cjs', 'umd', 'es'];

const buildTsConfig = ({ format, sourceMap }) => {
  const extraConfig =
    format === 'umd'
      ? { compilerOptions: { target: 'es5', sourceMap } }
      : { compilerOptions: { sourceMap } };
  return typescript({ ...tsConfigJson, ...extraConfig });
};

const productionConfigs = outputFormats.map(format => ({
  input,
  output: [
    {
      file: `dist/${format}/index.js`,
      format,
      sourcemap: tsConfigJson.compilerOptions.sourceMap,
      name,
      compact: true,
    },
  ],
  plugins: [
    buildTsConfig({
      format,
      sourceMap: tsConfigJson.compilerOptions.sourceMap,
    }),
    terser(),
  ],
}));

const developmentConfigs = outputFormats.map(format => ({
  input,
  output: [
    {
      file: `dist/${format}/index.development.js`,
      format,
      name,
    },
  ],
  plugins: [buildTsConfig({ format, sourceMap: false })],
}));

export default [...productionConfigs, ...developmentConfigs];
