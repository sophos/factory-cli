import {
  ProjectsApi,
  JobsApi,
  RunsApi,
  OrganizationsApi,
  PipelinesApi,
  Configuration,
} from '@refactr/api-client';

export default class Client {
  private readonly _jobs: JobsApi;
  private readonly _runs: RunsApi;
  private readonly _projects: ProjectsApi;
  private readonly _organizations: OrganizationsApi;
  private readonly _pipelines: PipelinesApi;

  constructor(baseUrl: string, accessToken: string) {
    const config = new Configuration({ basePath: baseUrl, accessToken });

    this._jobs = new JobsApi(config);
    this._runs = new RunsApi(config);
    this._projects = new ProjectsApi(config);
    this._organizations = new OrganizationsApi(config);
    this._pipelines = new PipelinesApi(config);
  }

  get pipelines(): PipelinesApi {
    return this._pipelines;
  }

  get projects(): ProjectsApi {
    return this._projects;
  }

  get organizations(): OrganizationsApi {
    return this._organizations;
  }

  get jobs(): JobsApi {
    return this._jobs;
  }

  get runs(): RunsApi {
    return this._runs;
  }
}
