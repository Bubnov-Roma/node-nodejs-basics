import { unlink, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const remove = async () => {
    const filePath = join(__dirname, './files/fileToRemove.txt');
    try {
        const fileStats = await stat(filePath);
        if (!fileStats.isFile()) {
            throw new Error('FS operation failed');
        }
        await unlink(filePath);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

remove();