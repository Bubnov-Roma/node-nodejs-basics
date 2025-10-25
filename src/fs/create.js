import { writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async () => {
    const absolutePath = resolve(__dirname, './files/fresh.txt');
    const content = 'I am fresh and young';
    try {
        await access(absolutePath, constants.F_OK);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile(absolutePath, content, 'utf8');
            return;
        }
        throw new Error('FS operation failed')
    }
};
create();