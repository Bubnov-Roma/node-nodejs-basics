import { Worker } from 'worker_threads';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const performCalculations = async () => {
    const cpuCores = cpus().length;
    const startNumber = 10;
    const workers = [];
    for (let i = 0; i < cpuCores; i += 1) {
        const workerNumber = startNumber + i;
        const workerPromises = new Promise((resolve) => {
            const worker = new Worker(join(__dirname, './worker.js'), {
                workerData: workerNumber
            });
            worker.on('message', (message) => {
                resolve({
                    status: message.status,
                    data: message.data
                });
            });
            worker.on('error', () => {
                resolve({
                    status: 'error',
                    data: 'null'
                });
            });
            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({
                        status: 'error',
                        data: 'null'
                    });
                }
            });
        });
        workers.push(workerPromises);
    }
    const workerResults = await Promise.all(workers);
    console.log(workerResults);
    return workerResults;
};
performCalculations().catch(console.error);