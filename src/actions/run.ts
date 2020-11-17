import { printTable } from 'console-table-printer';

import { RunsApi } from '@refactr/api-client';
// import { RunsApi } from '../../../refactr-api-client/src';

import { error, log } from '../utilities';
import { getConfig } from '../getConfig';
import { retry } from '../utils/retry';

const FINISH_STATUSES = ['Succeeded', 'Failed'];

async function get(
    projectId: string,
    runId: string,
    accessToken: string,
    basePath: string
) {
    const config = getConfig(basePath, accessToken);
    const runClient = new RunsApi(config);
    const res = await runClient.getRun(
        projectId,
        runId
    );
    console.log(res);
}

export { get };
