import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const calculateHash = async () => {
    const filePath = join(__dirname, './files/fileToCalculateHashFor.txt');
    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const stream = createReadStream(filePath);
        stream.on('data', (chunk) => {
            hash.update(chunk);
        });
        stream.on('end', () => {
            const hexHash = hash.digest('hex');
            console.log(hexHash);
            resolve();
        })
        stream.on('error', (error) => {
            reject(new Error('FS operation failed'))
        });
    });
};

calculateHash();