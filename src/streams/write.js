import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const write = async () => {
    const filePath = join(__dirname, './files/fileToWrite.txt');
    return new Promise((resolve, reject) => {
        const writableStream = createWriteStream(filePath, { encoding: 'utf-8' });
        process.stdin.pipe(writableStream);
        writableStream.on('finish', () => {
            resolve();
        });
        writableStream.on('error', () => {
            reject(new Error('FS operation failed'));
        });
        process.stdin.on('error', () => {
            reject(new Error('FS operation failed'));
        });
    });
};

write();