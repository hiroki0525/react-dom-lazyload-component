import { promisify } from 'util';
import { exec as defaultExec } from 'child_process';
import packageJson from '../package.json' assert { type: 'json' };

const exec = promisify(defaultExec);

const { dependencies, devDependencies } = packageJson;

if (dependencies) {
  const installDepsCommand = Object.entries(dependencies)
    .map(entry => `${entry[0]}@${entry[1]} --force`)
    .join(' ');
  try {
    await exec(`npm i ${installDepsCommand}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (devDependencies) {
  const installDevDepsCommand = Object.entries(devDependencies)
    .map(entry => `${entry[0]}@${entry[1]}`)
    .join(' ');
  try {
    await exec(`npm i -D ${installDevDepsCommand} --force`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
