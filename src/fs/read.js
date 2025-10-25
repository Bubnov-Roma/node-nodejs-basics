import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { access, readFile } from 'fs/promises'
import { constants } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt')
    try {
        await access(filePath, constants.F_OK)
        const content = await readFile(filePath, 'utf-8')
        console.log(content)
    } catch {
        throw new Error('FS operation failed')
    }
};

read()