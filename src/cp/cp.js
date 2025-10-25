import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const spawnChildProcess = async (args) => {
    const scriptPath = join(__dirname, './files/script.js');
    const child_process = spawn('node', [scriptPath, ...args]);
    try {
        await Promise.all([
            pipeline(process.stdin, child_process.stdin),
            pipeline(child_process.stdout, process.stdout)
        ]);
    } catch (error) {
        console.error('Pipeline error:', error);
    }
    child_process.stderr.on('data', (data) => {
        console.error(`Child stderr: ${data}`);
    });
    child_process.on('close', (code) => {
        console.log(`Child process exited with code ${code}`)
    });
    return child_process;
};

await spawnChildProcess().catch(console.error);