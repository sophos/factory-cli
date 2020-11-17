import { ProjectsApi } from '@refactr/api-client';

import { getConfig } from '../getConfig';
import { handleAPIError } from '../utilities';

async function list(
    accessToken: string,
    basePath: string,
    { organizationId }: { organizationId?: string } = {}
) {
    const client = new ProjectsApi(getConfig(basePath, accessToken));

    try {
        if (organizationId) {
            return await client.listOrganizationProjects(
                organizationId
            );
        } else {
            return await client.listProjects();
        }
    } catch (err) {
        handleAPIError(err);
        return;
    }
}

export { list };
