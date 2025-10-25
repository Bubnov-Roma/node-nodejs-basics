import { fileURLToPath } from 'url'
import { dirname, join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
    const sourcePath = join(__dirname, './files/archive.gz');
    const targetPath = join(__dirname, './files/fileToCompress.txt');
    try {
        const readableStream = createReadStream(sourcePath);
        const writableStream = createWriteStream(targetPath);
        const gunzip = createGunzip();
        await pipeline(readableStream, gunzip, writableStream);
    } catch {
        throw new Error('FS operation failed');
    }
};

decompress();