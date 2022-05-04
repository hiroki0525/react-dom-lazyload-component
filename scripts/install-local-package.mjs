import { promisify } from 'util';
import { exec as defaultExec } from 'child_process';
import fs from 'fs/promises';
import packageJson from '../examples/package.json' assert { type: 'json' };

const exec = promisify(defaultExec);
const packageName = `react-dom-lazyload-component-${process.env.npm_package_version}.tgz`;
const baseDir = 'examples';
const exportDir = `./${baseDir}`;

try {
  await fs.unlink(packageName);
} catch (e) {
  console.debug(e);
}
try {
  await exec('npm run build && npm pack');
  await fs.copyFile(packageName, `${exportDir}/${packageName}`);
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  packageJson.dependencies[
    'react-dom-lazyload-component'
  ] = `file:../${baseDir}/${packageName}`;
  await fs.unlink(`./${baseDir}/package.json`);
  await fs.writeFile(
    `./${baseDir}/package.json`,
    JSON.stringify(packageJson, null, ' ')
  );
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await fs.unlink(packageName);
}
