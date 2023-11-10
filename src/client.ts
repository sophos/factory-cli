import { factoryApi, factoryAuthApi } from '@sophos-factory/api-client';

export default class Client {
  public readonly jobs: factoryApi.JobsApi;
  public readonly runs: factoryApi.RunsApi;
  public readonly projects: factoryApi.ProjectsApi;
  public readonly organizations: factoryAuthApi.OrganizationsApi;
  public readonly pipelines: factoryApi.PipelinesApi;
  public readonly runnerManagers: factoryApi.RunnerPoolsApi;
  public readonly credentials: factoryApi.CredentialsApi;

  constructor({
    baseUrl,
    accessToken,
    authBaseUrl
  }: {
    baseUrl: string;
    accessToken: string;
    authBaseUrl?: string;
  }) {
    const config = new factoryApi.Configuration({
      basePath: baseUrl,
      accessToken
    });

    this.jobs = new factoryApi.JobsApi(config);
    this.runs = new factoryApi.RunsApi(config);
    this.projects = new factoryApi.ProjectsApi(config);
    this.pipelines = new factoryApi.PipelinesApi(config);
    this.runnerManagers = new factoryApi.RunnerPoolsApi(config);
    this.credentials = new factoryApi.CredentialsApi(config);

    const authConfig = new factoryAuthApi.Configuration({
      basePath: authBaseUrl,
      accessToken
    });

    this.organizations = new factoryAuthApi.OrganizationsApi(authConfig);
  }
}
