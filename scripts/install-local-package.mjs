import { exec } from 'child_process';
import fs from 'fs/promises';

const packageName = `react-dom-lazyload-component-${process.env.npm_package_version}.tgz`;
const baseDir = 'examples';
const tmpDir = 'tmp';
const exportDir = `./${baseDir}/${tmpDir}`;

(async () => {
  try {
    await fs.rmdir(exportDir, { recursive: true });
  } catch (e) {
    console.debug(e);
  }
  exec('npm run build && npm pack', async (error, stdout, stderr) => {
    if (error) {
      throw new Error(stderr);
    }
    console.log(`stdout: ${stdout}`);
    try {
      try {
        await fs.mkdir(exportDir);
      } catch (e) {
        console.info(e);
      }
      await fs.copyFile(packageName, `${exportDir}/${packageName}`);
      exec(
        `cd ${baseDir} && npm i ./${tmpDir}/${packageName}`,
        async (error, stdout, stderr) => {
          if (error) {
            throw new Error(stderr);
          }
          console.log(`stdout: ${stdout}`);
        }
      );
    } catch (e) {
      console.error(e);
      try {
        await fs.rmdir(exportDir, { recursive: true });
      } catch (e) {
        console.debug(e);
      }
      process.exit(1);
    } finally {
      await fs.unlink(packageName);
    }
  });
})();
