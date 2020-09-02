import { Configuration } from '@refactr/api-client';

function getConfig(basePath: string, accessToken: string) {
    return new Configuration({
        basePath,
        accessToken
    });
}

export { getConfig };
