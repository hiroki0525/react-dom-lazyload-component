import { promisify } from 'util';
import { exec as defaultExec } from 'child_process';
import fs from 'fs/promises';

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
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await fs.unlink(packageName);
}
