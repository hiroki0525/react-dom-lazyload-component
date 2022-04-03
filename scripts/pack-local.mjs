import { exec } from 'child_process';
import fs from 'fs/promises';

const packageName = `react-dom-lazyload-component-${process.env.npm_package_version}.tgz`;
const exportDir = './examples/tmp';

const cleanup = async () => {
  try {
    await fs.unlink(packageName);
    await fs.rmdir(exportDir, { recursive: true });
  } catch (e) {
    console.info(e);
  }
};

exec('npm run build && npm pack', async (error, stdout, stderr) => {
  if (error) {
    console.error(`stderr: ${stderr}`);
    await cleanup();
    process.exit(1);
  }
  console.log(`stdout: ${stdout}`);
  try {
    try {
      await fs.mkdir(exportDir);
    } catch (e) {
      console.info(e);
    }
    await fs.copyFile(packageName, `${exportDir}/${packageName}`);
    await fs.unlink(packageName);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await cleanup();
  }
});
