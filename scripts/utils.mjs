import { promisify } from 'util';
import { exec as defaultExec } from 'child_process';

const exec = promisify(defaultExec);

export { exec };
