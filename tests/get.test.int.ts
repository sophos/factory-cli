/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { execute, executeAsIs } from './helpers/execute';
import knownIds from './helpers/knownIds';
import { withCmd } from './helpers/options';
import yaml from 'js-yaml';

describe('factoryctl get', () => {
  jest.setTimeout(60 * 1000);
  test('formats as JSON when --format=json is passed', async () => {
    const formatJsonOrg = async () => {
      const json = JSON.stringify(
        await execute(
          ['get', 'organization', knownIds.organization, '--format', 'json'],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      );
      JSON.parse(json);
    };
    expect(formatJsonOrg).not.toThrow();

    const formatJsonProj = async () => {
      const json = JSON.stringify(
        await execute(
          ['get', 'project', knownIds.project, '--format', 'json'],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        )
      );
      JSON.parse(json);
    };
    expect(formatJsonProj).not.toThrow();

    const formatJsonCred = async () => {
      const json = JSON.stringify(
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
        )
      );
      JSON.parse(json);
    };
    expect(formatJsonCred).not.toThrow();

    const formatJsonJob = async () => {
      const json = JSON.stringify(
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
        )
      );
      JSON.parse(json);
    };
    expect(formatJsonJob).not.toThrow();

    const formatJsonPipe = async () => {
      const json = JSON.stringify(
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
        )
      );
      JSON.parse(json);
    };
    expect(formatJsonPipe).not.toThrow();
  });

  test('formats as YAML when --format=yaml is passed', async () => {
    const formatYamlOrg = async () => {
      const res = await execute(
        ['get', 'organization', knownIds.organization, '--format', 'yaml'],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      );
      yaml.load(res);
    };
    expect(formatYamlOrg).not.toThrow();

    const formatYamlProj = async () => {
      const res = await execute(
        ['get', 'project', knownIds.project, '--format', 'yaml'],
        {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }
      );
      yaml.load(res);
    };
    expect(formatYamlProj).not.toThrow();

    const formatYamlCred = async () => {
      const res = await execute(
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
      );
      yaml.load(res);
    };
    expect(formatYamlCred).not.toThrow();

    const formatYamlJob = async () => {
      const res = await execute(
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
      );
      yaml.load(res);
    };
    expect(formatYamlJob).not.toThrow();

    const formatYamlPipe = async () => {
      const res = await execute(
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
      );
      yaml.load(res);
    };
    expect(formatYamlPipe).not.toThrow();
  });

  describe('organization', () => {
    test('returns organization information', async () => {
      await expect(
        execute(
          ['get', 'organization', knownIds.organization, '--format', 'json'],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.organization);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.organization} | ${withCmd(
            'get organization --format=json'
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.organization);
    });
  });

  describe('project', () => {
    test('returns project information', async () => {
      await expect(
        execute(['get', 'project', knownIds.project, '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.project);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.project} | ${withCmd('get project --format=json')}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
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
        ).then((value) => JSON.parse(value))
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
        ).then((value) => JSON.parse(value))
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
      ).then((value) => JSON.parse(value))
    ).resolves.toHaveProperty('_id', knownIds.job);
  });

  test('accepts id from stdin', async () => {
    await expect(
      executeAsIs(
        `echo ${knownIds.job} | ${withCmd(
          `get job --project-id ${knownIds.project} --format=json`
        )}`,
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((value) => JSON.parse(value))
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
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.pipelineRevision);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.pipelineRevision} | ${withCmd(
            `get pipeline-revision --project-id ${knownIds.project} --pipeline-id ${knownIds.pipeline} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
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
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.pipeline);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.pipeline} | ${withCmd(
            `get pipeline --project-id ${knownIds.project} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.pipeline);
    });
  });

  describe('runner', () => {
    test('returns runner information', async () => {
      await expect(
        execute(
          [
            'get',
            'runner',
            '--organization-id',
            knownIds.organization,
            knownIds.runner,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.runner);
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.runner} | ${withCmd(
            `get runner --organization-id ${knownIds.organization} --format=json`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('_id', knownIds.runner);
    });
  });
});
