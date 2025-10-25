import { readdir, mkdir, copyFile, access } from 'fs/promises'
import { constants } from 'fs';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const copy = async () => {
    const sourceDir = join(__dirname, 'files');
    const targetDir = join(__dirname, 'files_copy');

    try {
        await access(sourceDir, constants.F_OK);
        try {
            await access(targetDir, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        await mkdir(targetDir);
        const files = await readdir(sourceDir);
        const copyPromises = files.map(async (file) => {
            const sourcePath = join(sourceDir, file);
            const targetPath = join(targetDir, file);
            await copyFile(sourcePath, targetPath);
        })
        await Promise.all(copyPromises)
    } catch (error) {
        if (error.message === 'FS operation failed') {
            throw error;
        }
        throw new Error('FS operation failed');
    }
};

copy();