import { JobsApi } from '@refactr/api-client';

import { getConfig } from '../getConfig';

async function run(
    projectId: string,
    jobId: string,
    accessToken: string,
    basePath: string,
    {
        variables = {},
        suppressOutputs = false,
        suppressEvents = false,
        suppressVariables = false
    }
) {
    const config = getConfig(basePath, accessToken);
    const jobClient = new JobsApi(config);
    const { data: { _id: id } = {} } = await jobClient.runJob(
        projectId,
        jobId,
        {
            variables,
            suppress_outputs: suppressOutputs,
            suppress_events: suppressEvents,
            suppress_vars: suppressVariables
        }
    );

    return { id };
}

async function list(projectId: string, accessToken: string, basePath: string) {
    const config = getConfig(basePath, accessToken);
    const client = new JobsApi(config);
    const { data: { jobs } = {} } = await client.listJobs(projectId);
    if (!jobs) {
        return;
    }

    return jobs.map(({ _id, name }) => ({
        id: _id,
        name
    }));
}

export { list, run };
