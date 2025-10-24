import { Transform } from 'stream';
import { pipeline } from 'stream/promises'

export const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, _encoding, callback) {
            const reversedText = chunk.toString().split('').reverse().join('');
            this.push(reversedText);
            callback();
        }
    });
    try {
        await pipeline(
            process.stdin,
            reverseTransform,
            process.stdout
        );
    } catch {
        throw new Error('Stream operation failed');
    }
};

transform();