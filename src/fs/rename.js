import { rename as fsRename, access } from 'fs/promises'
import { constants } from 'fs';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rename = async () => {
    const sourceFile = join(__dirname, './files/wrongFilename.txt');
    const targetFile = join(__dirname, './files/properFilename.md');

    try {
        await access(sourceFile, constants.F_OK);
        try {
            await access(targetFile, constants.F_OK);
            throw new Error('FS operation failed')
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        await fsRename(sourceFile, targetFile);
    } catch (error) {
        if (error.message === 'FS operation failed') {
            throw error;
        }
        throw new Error('FS operation failed');
    }
};

rename();