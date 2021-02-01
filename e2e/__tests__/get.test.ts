import { executeAsIs, execute } from '../helpers/execute';
import { withCmd } from '../helpers/options';
import knownIds from '../helpers/knowIds';

describe('refactrctl get', () => {
  jest.setTimeout(15000);

  test('throws on missing subcommand', async () => {
    await expect(
      execute(['get'], { token: process.env.STATIC_REFACTR_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  test('formats as JSON when --format=json is passed', async () => {
    await expect(
      execute(
        [
          'get',
          'organization',
          knownIds.static.organization,
          '--format',
          'json'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
    await expect(
      execute(['get', 'project', knownIds.static.project, '--format', 'json'], {
        token: process.env.STATIC_REFACTR_AUTH_TOKEN!
      })
    ).resolves.toMatchSnapshot();
    await expect(
      execute(
        [
          'get',
          'credential',
          knownIds.static.credential,
          '--project-id',
          knownIds.static.project,
          '--format',
          'json'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
    await expect(
      execute(
        [
          'get',
          'job',
          knownIds.static.job,
          '--project-id',
          knownIds.static.project,
          '--format',
          'json'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
    await expect(
      execute(
        [
          'get',
          'pipeline',
          knownIds.static.pipeline,
          '--project-id',
          knownIds.static.project,
          '--format',
          'json'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
  });

  test('formats as JSON when --format=yaml is passed', async () => {
    await expect(
      execute(
        [
          'get',
          'organization',
          knownIds.static.organization,
          '--format',
          'yaml'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
    await expect(
      execute(['get', 'project', knownIds.static.project, '--format', 'yaml'], {
        token: process.env.STATIC_REFACTR_AUTH_TOKEN!
      })
    ).resolves.toMatchSnapshot();
    await expect(
      execute(
        [
          'get',
          'credential',
          knownIds.static.credential,
          '--project-id',
          knownIds.static.project,
          '--format',
          'yaml'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
    await expect(
      execute(
        [
          'get',
          'job',
          knownIds.static.job,
          '--project-id',
          knownIds.static.project,
          '--format',
          'yaml'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
    await expect(
      execute(
        [
          'get',
          'pipeline',
          knownIds.static.pipeline,
          '--project-id',
          knownIds.static.project,
          '--format',
          'yaml'
        ],
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      )
    ).resolves.toMatchSnapshot();
  });

  describe('organization', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'organization'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'organization', knownIds.static.organization], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.organization} | ${withCmd(
            'get organization'
          )}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'project'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'project', knownIds.static.project], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.project} | ${withCmd('get project')}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'credential'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'credential', '--project-id', knownIds.static.project],
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
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
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.credential} | ${withCmd(
            `get credential --project-id ${knownIds.static.project}`
          )}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'job'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'job', '--project-id', knownIds.static.project], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
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
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.job} | ${withCmd(
            `get job --project-id ${knownIds.static.project}`
          )}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline-revision'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
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
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
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
            `${knownIds.static.pipelineRevision}`
          ],
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.pipelineRevision} | ${withCmd(
            `get pipeline-revision --project-id ${knownIds.static.project} --pipeline-id ${knownIds.static.pipeline}`
          )}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      await expect(
        execute(['get', 'pipeline', '--project-id', knownIds.static.project], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
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
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.pipeline} | ${withCmd(
            `get pipeline --project-id ${knownIds.static.project}`
          )}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'runner'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'runner', '--organization-id', knownIds.static.organization],
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
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
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.static.runner} | ${withCmd(
            `get runner --organization-id ${knownIds.static.organization}`
          )}`,
          { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('run', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'run'], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'run', '--project-id', knownIds.static.project], {
          token: process.env.STATIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
