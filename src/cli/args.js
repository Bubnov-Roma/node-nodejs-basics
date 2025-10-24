export const parseArgs = () => {
    const args = process.argv.slice(2)
    const result = args.reduce((acc, arg, index, array) => {
        if (arg.startsWith('--') && array[index + 1]) {
            const propNme = arg.slice(2)
            const value = array[index + 1]
            acc.push(`${propNme} is ${value}`)
        }
        return acc
    }, [])
    if (result.length > 0) console.log(result.join(', '))
};
parseArgs()