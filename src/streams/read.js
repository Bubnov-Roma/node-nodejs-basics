import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { createReadStream } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const read = async () => {
    const filePath = join(__dirname, './files/fileToRead.txt');
    return new Promise((resolve, reject) => {
        const readableStream = createReadStream(filePath, { encoding: 'utf-8' });
        readableStream.pipe(process.stdout);
        readableStream.on('end', () => {
            process.stdout.write('\n');
            resolve();
        })
        readableStream.on('error', (error) => {
            reject(new Error('FS operation failed'))
        })
    })
};

read();