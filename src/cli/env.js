export const parseEnv = () => {
    const envVariables = process.env
    const rssVariables = Object.entries(envVariables)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`);
    if (rssVariables.length > 0) {
        console.log(rssVariables.join('; '))
    }
};

process.env.RSS_name1 = 'value1';
process.env.RSS_name2 = 'value2';
process.env.RSS_name3 = 'value3';
process.env.OTHER_VAR = 'should_not_appear';

parseEnv();