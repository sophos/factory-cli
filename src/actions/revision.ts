import { promises as fs } from 'fs';

import { PipelinesApi } from '@refactr/api-client';
import { safeLoad, JSON_SCHEMA } from 'js-yaml';

import { getConfig } from '../getConfig';
import { handleAPIError } from '../utilities';

function parseYamlOrJson<T>(str: string): T {
    let obj;
    try {
        obj = safeLoad(str, {
            schema: JSON_SCHEMA
        });
    } catch (yamlErr) {
        try {
            obj = JSON.parse(str);
        } catch (jsonErr) {
            throw new Error(
                'Failed to parse input as YAML or JSON\n\n' +
                    yamlErr.message +
                    '\n\n' +
                    jsonErr.message
            );
        }
    }
    return obj;
}

async function pipelineFromFile<T>(path: string): Promise<T> {
    let revision: string;
    try {
        revision = await fs.readFile(path, { encoding: 'utf8' });
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`File at ${path} does not exist!`);
        }

        throw err;
    }

    return parseYamlOrJson(revision);
}

async function createRevision(
    revisionContent: any,
    projectId: string,
    pipelineId: string,
    accessToken: string,
    basePath: string
) {
    const client = new PipelinesApi(getConfig(basePath, accessToken));

    const {
        data: { _id: id, revision } = {}
    } = await client.createPipelineRevision(
        projectId,
        pipelineId,
        revisionContent
    );

    return {
        id,
        revision,
        pipeline_id: pipelineId
    };
}

async function getLatestPipelineRevision(
    projectId: string,
    pipelineId: string,
    accessToken: string,
    basePath: string
) {
    const client = new PipelinesApi(getConfig(basePath, accessToken));

    try {
        const {
            data: { pipeline_revisions: revisions = [] } = {}
        } = await client.getPipelineRevisions(projectId, pipelineId, null, 1);

        if (revisions.length > 0) {
            const [revInfo] = revisions;
            const revisionNumber = revInfo.revision;

            const { data } = await client.getPipelineRevision(
                projectId,
                pipelineId,
                revisionNumber
            );

            return data;
        }
    } catch (err) {
        handleAPIError(err);
        return;
    }
}

function compareRevisions(r1: any, r2: any) {
    const knownKeys = ['outputs', 'layout', 'steps', 'variables'];
    let ok = false;

    for (const key of knownKeys) {
        const c1 = r1[key];
        const c2 = r2[key];

        ok = JSON.stringify(c1) === JSON.stringify(c2);
        if (!ok) {
            return false;
        }
    }

    return true;
}

async function findOrCreateRevision(
    path: string,
    projectId: string,
    pipelineId: string,
    accessToken: string,
    basePath: string
) {
    const r1 = await getLatestPipelineRevision(
        projectId,
        pipelineId,
        accessToken,
        basePath
    );
    const revisionContent = await pipelineFromFile(path);

    if (compareRevisions(r1, revisionContent)) {
        return {
            id: r1._id,
            revision: r1.revision,
            pipeline_id: pipelineId
        };
    }

    return await createRevision(
        revisionContent,
        projectId,
        pipelineId,
        accessToken,
        basePath
    );
}

async function create(
    path: string,
    projectId: string,
    pipelineId: string,
    accessToken: string,
    basePath: string
) {
    const revisionContent = await pipelineFromFile(path);

    return await createRevision(
        revisionContent,
        projectId,
        pipelineId,
        accessToken,
        basePath
    );
}

async function run(
    revision: number,
    projectId: string,
    pipelineId: string,
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
    const client = new PipelinesApi(config);
    const { data: { _id: id } = {} } = await client.runPipeline(
        projectId,
        pipelineId,
        revision,
        {
            variables,
            suppress_outputs: suppressOutputs,
            suppress_events: suppressEvents,
            suppress_vars: suppressVariables
        }
    );

    return { id };
}

export { create, run, findOrCreateRevision };
