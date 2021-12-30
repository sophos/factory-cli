/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { format } from 'date-fns';
import isArray from 'lodash/isArray';
import { execute, executeAsIs } from '../helpers/execute';
import knownIds from '../helpers/knownIds';
import { withCmd } from '../helpers/options';
import yaml from 'js-yaml';

describe('refactrctl get', () => {
  jest.setTimeout(60 * 1000);

  test('throws on missing subcommand', async () => {
    await expect(
      execute(['get'], { token: process.env.FACTORY_STATIC_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  test('formats as JSON when --format=json is passed', async () => {
    const formatJsonOrg = async () => {
      const json = JSON.stringify(
        await execute(
          [
            'get',
            'organization',
            knownIds.static.organization,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      );
      JSON.parse(json);
    };
    expect(formatJsonOrg).not.toThrow();

    const formatJsonProj = async () => {
      const json = JSON.stringify(
        await execute(
          ['get', 'project', knownIds.static.project, '--format', 'json'],
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
            knownIds.static.credential,
            '--project-id',
            knownIds.static.project,
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
            knownIds.static.job,
            '--project-id',
            knownIds.static.project,
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
            knownIds.static.pipeline,
            '--project-id',
            knownIds.static.project,
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
        [
          'get',
          'organization',
          knownIds.static.organization,
          '--format',
          'yaml'
        ],
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      );
      yaml.load(res);
    };
    expect(formatYamlOrg).not.toThrow();

    const formatYamlProj = async () => {
      const res = await execute(
        ['get', 'project', knownIds.static.project, '--format', 'yaml'],
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
          knownIds.static.credential,
          '--project-id',
          knownIds.static.project,
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
          knownIds.static.job,
          '--project-id',
          knownIds.static.project,
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
          knownIds.static.pipeline,
          '--project-id',
          knownIds.static.project,
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
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'organization'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'organization', knownIds.static.organization], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.organization} | ${withCmd(
            'get organization'
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'project'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'project', knownIds.static.project], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.project} | ${withCmd('get project')}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'credential'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'credential', '--project-id', knownIds.static.project],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(
          [
            'get',
            'credential',
            '--project-id',
            knownIds.static.project,
            knownIds.static.credential
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.credential} | ${withCmd(
            `get credential --project-id ${knownIds.static.project}`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'job'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'job', '--project-id', knownIds.static.project], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(
          [
            'get',
            'job',
            '--project-id',
            knownIds.static.project,
            knownIds.static.job
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.job} | ${withCmd(
            `get job --project-id ${knownIds.static.project}`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline-revision'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          [
            'get',
            'pipeline-revision',
            '--project-id',
            knownIds.static.project,
            '--pipeline-id',
            knownIds.static.pipeline
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(
          [
            'get',
            'pipeline-revision',
            '--project-id',
            knownIds.static.project,
            '--pipeline-id',
            knownIds.static.pipeline,
            knownIds.static.pipelineRevision
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.pipelineRevision} | ${withCmd(
            `get pipeline-revision --project-id ${knownIds.static.project} --pipeline-id ${knownIds.static.pipeline}`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      await expect(
        execute(['get', 'pipeline', '--project-id', knownIds.static.project], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(
          [
            'get',
            'pipeline',
            '--project-id',
            knownIds.static.project,
            knownIds.static.pipeline
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.pipeline} | ${withCmd(
            `get pipeline --project-id ${knownIds.static.project}`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'runner'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'runner', '--organization-id', knownIds.static.organization],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(
          [
            'get',
            'runner',
            '--organization-id',
            knownIds.static.organization,
            knownIds.static.runner
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.runner} | ${withCmd(
            `get runner --organization-id ${knownIds.static.organization}`
          )}`,
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('run', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'run'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'run', '--project-id', knownIds.static.project], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
