import fs from 'fs/promises';
import packageJson from '../examples/package.json' assert { type: 'json' };

const packageName = `react-dom-lazyload-component-${process.env.npm_package_version}.tgz`;
const baseDir = 'examples';
const exportDir = `./${baseDir}`;

try {
  await fs.unlink(`./${exportDir}/${packageName}`);
  if (!packageJson.dependencies) {
    process.exit(0);
  }
  delete packageJson.dependencies['react-dom-lazyload-component'];
  await fs.unlink(`./${baseDir}/package.json`);
  await fs.writeFile(
    `./${baseDir}/package.json`,
    JSON.stringify(packageJson, null, ' ')
  );
} catch (e) {
  console.error(e);
  process.exit(1);
}
