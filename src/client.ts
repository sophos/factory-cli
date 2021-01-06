import {
  ProjectsApi,
  JobsApi,
  RunsApi,
  OrganizationsApi,
  PipelinesApi,
  Configuration,
} from '@refactr/api-client';

export default class Client {
  public readonly jobs: JobsApi;
  public readonly runs: RunsApi;
  public readonly projects: ProjectsApi;
  public readonly organizations: OrganizationsApi;
  public readonly pipelines: PipelinesApi;

  constructor(baseUrl: string, accessToken: string) {
    const config = new Configuration({ basePath: baseUrl, accessToken });

    this.jobs = new JobsApi(config);
    this.runs = new RunsApi(config);
    this.projects = new ProjectsApi(config);
    this.organizations = new OrganizationsApi(config);
    this.pipelines = new PipelinesApi(config);
  }
}
