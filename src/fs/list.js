import { readdir, access, stat } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const list = async () => {
    const folderPath = join(__dirname, './files');
    try {
        await access(folderPath, constants.F_OK)
        const files = await readdir(folderPath);
        console.log(files)
    } catch (error) {
        throw new Error('FS operation failed')
    }
};

list();