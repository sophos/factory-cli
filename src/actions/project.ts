import { ProjectsApi } from '@refactr/api-client';

import { getConfig } from '../getConfig';

async function list(
    accessToken: string,
    basePath: string,
    { organizationId }: { organizationId?: string } = {}
) {
    const client = new ProjectsApi(getConfig(basePath, accessToken));

    let projects;
    if (organizationId) {
        const { data } = await client.listOrganizationProjects(organizationId);
        projects = data.projects;
    } else {
        const { data } = await client.listProjects();
        projects = data.projects;
    }

    if (!projects) {
        return;
    }

    return projects.map(({ _id, name, organization_id }) => ({
        id: _id,
        name,
        organization_id
    }));
}

export { list };
