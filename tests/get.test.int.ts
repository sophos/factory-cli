/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { execute, executeAsIs } from './helpers/execute';
import knownIds from './helpers/knownIds';
import { withCmd } from './helpers/options';
import parseOutput, { asJson } from './helpers/parseOutput';

describe('factoryctl get', () => {
  jest.setTimeout(60 * 1000);

  test('formats as JSON when --format=json is passed', async () => {
    const formatJsonOrg = async () => {
      await execute(
        ['get', 'organization', knownIds.organization, '--format', 'json'],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result, asJson));
    };
    expect(formatJsonOrg).not.toThrow();

    const formatJsonProj = async () => {
      await execute(['get', 'project', knownIds.project, '--format', 'json'], {
        token: process.env.FACTORY_STATIC_AUTH_TOKEN!
      }).then((result) => parseOutput(result, asJson));
    };
    expect(formatJsonProj).not.toThrow();

    const formatJsonCred = async () => {
      await execute(
        [
          'get',
          'credential',
          knownIds.credential,
          '--project-id',
          knownIds.project,
          '--format',
          'json'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result, asJson));
    };
    expect(formatJsonCred).not.toThrow();

    const formatJsonJob = async () => {
      await execute(
        [
          'get',
          'job',
          knownIds.job,
          '--project-id',
          knownIds.project,
          '--format',
          'json'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result, asJson));
    };
    expect(formatJsonJob).not.toThrow();

    const formatJsonPipeline = async () => {
      await execute(
        [
          'get',
          'pipeline',
          knownIds.pipeline,
          '--project-id',
          knownIds.project,
          '--format',
          'json'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result, asJson));
    };
    expect(formatJsonPipeline).not.toThrow();
  });

  test('formats as YAML when --format=yaml is passed', async () => {
    const formatYamlOrganization = async () => {
      await execute(
        ['get', 'organization', knownIds.organization, '--format', 'yaml'],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result));
    };
    expect(formatYamlOrganization).not.toThrow();

    const formatYamlProj = async () => {
      await execute(['get', 'project', knownIds.project, '--format', 'yaml'], {
        token: process.env.FACTORY_STATIC_AUTH_TOKEN!
      }).then((result) => parseOutput(result));
    };
    expect(formatYamlProj).not.toThrow();

    const formatYamlCredential = async () => {
      await execute(
        [
          'get',
          'credential',
          knownIds.credential,
          '--project-id',
          knownIds.project,
          '--format',
          'yaml'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result));
    };
    expect(formatYamlCredential).not.toThrow();

    const formatYamlJob = async () => {
      await execute(
        [
          'get',
          'job',
          knownIds.job,
          '--project-id',
          knownIds.project,
          '--format',
          'yaml'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result));
    };
    expect(formatYamlJob).not.toThrow();

    const formatYamlPipeline = async () => {
      await execute(
        [
          'get',
          'pipeline',
          knownIds.pipeline,
          '--project-id',
          knownIds.project,
          '--format',
          'yaml'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result));
    };
    expect(formatYamlPipeline).not.toThrow();
  });

  describe('organization', () => {
    test('returns organization information', async () => {
      await expect(
        execute(
          ['get', 'organization', knownIds.organization, '--format', 'json'],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.organization);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.organization} | ${withCmd(
            'get organization --format=json'
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.organization);
    });
  });

  describe('project', () => {
    test('returns project information', async () => {
      await expect(
        execute(['get', 'project', knownIds.project, '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.project);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.project} | ${withCmd('get project --format=json')}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.project);
    });
  });

  describe('credential', () => {
    test('returns credential information', async () => {
      await expect(
        execute(
          [
            'get',
            'credential',
            '--project-id',
            knownIds.project,
            knownIds.credential,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('id', knownIds.credential);
      // TODO toHaveProperty('project_id', knownIds.project);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.credential} | ${withCmd(
            `get credential --project-id ${knownIds.project} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('id', knownIds.credential);
    });
  });

  test('returns job information', async () => {
    await expect(
      execute(
        [
          'get',
          'job',
          '--project-id',
          knownIds.project,
          knownIds.job,
          '--format',
          'json'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result))
    ).resolves.toHaveProperty('_id', knownIds.job);
  });

  test('accepts id from stdin', async () => {
    await expect(
      executeAsIs(
        `echo ${knownIds.job} | ${withCmd(
          `get job --project-id ${knownIds.project} --format=json`
        )}`,
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result))
    ).resolves.toHaveProperty('_id', knownIds.job);
  });

  describe('pipeline-revision', () => {
    test('returns pipeline revision information', async () => {
      await expect(
        execute(
          [
            'get',
            'pipeline-revision',
            '--project-id',
            knownIds.project,
            '--pipeline-id',
            knownIds.pipeline,
            knownIds.pipelineRevision,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.pipelineRevision);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.pipelineRevision} | ${withCmd(
            `get pipeline-revision --project-id ${knownIds.project} --pipeline-id ${knownIds.pipeline} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.pipelineRevision);
    });
  });

  describe('pipeline', () => {
    test('returns pipeline information', async () => {
      await expect(
        execute(
          [
            'get',
            'pipeline',
            '--project-id',
            knownIds.project,
            knownIds.pipeline,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.pipeline);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.pipeline} | ${withCmd(
            `get pipeline --project-id ${knownIds.project} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.pipeline);
    });
  });

  describe('runner pools', () => {
    test('returns runner pool information', async () => {
      await expect(
        execute(
          [
            'get',
            'runner-pool',
            '--organization-id',
            knownIds.organization,
            knownIds.runnerPool,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.runnerPool);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.runnerPool} | ${withCmd(
            `get runner-pool --organization-id ${knownIds.organization} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result))
      ).resolves.toHaveProperty('_id', knownIds.runnerPool);
    });
  });
});
