import { fileURLToPath } from 'url'
import { dirname, join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compress = async () => {
    const sourcePath = join(__dirname, './files/fileToCompress.txt');
    const targetPath = join(__dirname, './files/archive.gz');

    try {
        const readableStream = createReadStream(sourcePath);
        const writableStream = createWriteStream(targetPath);
        const gzip = createGzip();
        await pipeline(readableStream, gzip, writableStream);
    } catch {
        throw new Error('FS operation failed');
    }
};

compress();