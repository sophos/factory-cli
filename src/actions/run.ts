import { RunsApi } from '@refactr/api-client';

import { getConfig } from '../getConfig';

async function get(
    projectId: string,
    runId: string,
    accessToken: string,
    basePath: string
) {
    const config = getConfig(basePath, accessToken);
    const runClient = new RunsApi(config);
    return await runClient.getRun(
        projectId,
        runId
    );
}

export { get };
