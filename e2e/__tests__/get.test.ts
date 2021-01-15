import { executeAsIs, execute } from '../helpers/execute';
import { withCmd } from '../helpers/options';

const knownIds = {
  organization: '5f9f2d08e2f1bb2436e6f5b0',
  project: '5ffc715d04ea5ca71d201bb3',
  job: '6001773304ea5cdf12201bc9',
  pipeline: '5ffde06a04ea5cf045201bbc',
  run: '600187e104ea5c3077201bcb',
  runner: '600187ce44a454482f23890b',
  credential: 'cli_test_cred_1',
  pipelineRevision: 4
};

describe('refactrctl get', () => {
  jest.setTimeout(15000);

  test('throws on missing subcommand', async () => {
    await expect(execute(['get'])).rejects.toMatchSnapshot();
  });

  test('formats as JSON when --format=json is passed', async () => {
    await expect(
      execute([
        'get',
        'organization',
        knownIds.organization,
        '--format',
        'json'
      ])
    ).resolves.toMatchSnapshot();
    await expect(
      execute(['get', 'project', knownIds.project, '--format', 'json'])
    ).resolves.toMatchSnapshot();
    await expect(
      execute([
        'get',
        'credential',
        knownIds.credential,
        '--project-id',
        knownIds.project,
        '--format',
        'json'
      ])
    ).resolves.toMatchSnapshot();
    await expect(
      execute([
        'get',
        'job',
        knownIds.job,
        '--project-id',
        knownIds.project,
        '--format',
        'json'
      ])
    ).resolves.toMatchSnapshot();
    await expect(
      execute([
        'get',
        'pipeline',
        knownIds.pipeline,
        '--project-id',
        knownIds.project,
        '--format',
        'json'
      ])
    ).resolves.toMatchSnapshot();
  });

  test('formats as JSON when --format=yaml is passed', async () => {
    await expect(
      execute([
        'get',
        'organization',
        knownIds.organization,
        '--format',
        'yaml'
      ])
    ).resolves.toMatchSnapshot();
    await expect(
      execute(['get', 'project', knownIds.project, '--format', 'yaml'])
    ).resolves.toMatchSnapshot();
    await expect(
      execute([
        'get',
        'credential',
        knownIds.credential,
        '--project-id',
        knownIds.project,
        '--format',
        'yaml'
      ])
    ).resolves.toMatchSnapshot();
    await expect(
      execute([
        'get',
        'job',
        knownIds.job,
        '--project-id',
        knownIds.project,
        '--format',
        'yaml'
      ])
    ).resolves.toMatchSnapshot();
    await expect(
      execute([
        'get',
        'pipeline',
        knownIds.pipeline,
        '--project-id',
        knownIds.project,
        '--format',
        'yaml'
      ])
    ).resolves.toMatchSnapshot();
  });

  describe('organization', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'organization'])).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'organization', knownIds.organization])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.organization} | ${withCmd('get organization')}`
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'project'])).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'project', knownIds.project])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(`echo ${knownIds.project} | ${withCmd('get project')}`)
      ).resolves.toMatchSnapshot();
    });
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'credential'])).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'credential', '--project-id', knownIds.project])
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute([
          'get',
          'credential',
          '--project-id',
          knownIds.project,
          knownIds.credential
        ])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.credential} | ${withCmd(
            `get credential --project-id ${knownIds.project}`
          )}`
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'job'])).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'job', '--project-id', knownIds.project])
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'job', '--project-id', knownIds.project, knownIds.job])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.job} | ${withCmd(
            `get job --project-id ${knownIds.project}`
          )}`
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline-revision'])
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute([
          'get',
          'pipeline-revision',
          '--project-id',
          knownIds.project,
          '--pipeline-id',
          knownIds.pipeline
        ])
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute([
          'get',
          'pipeline-revision',
          '--project-id',
          knownIds.project,
          '--pipeline-id',
          knownIds.pipeline,
          `${knownIds.pipelineRevision}`
        ])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.pipelineRevision} | ${withCmd(
            `get pipeline-revision --project-id ${knownIds.project} --pipeline-id ${knownIds.pipeline}`
          )}`
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'pipeline'])).rejects.toMatchSnapshot();

      await expect(
        execute(['get', 'pipeline', '--project-id', knownIds.project])
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute([
          'get',
          'pipeline',
          '--project-id',
          knownIds.project,
          knownIds.pipeline
        ])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.pipeline} | ${withCmd(
            `get pipeline --project-id ${knownIds.project}`
          )}`
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'runner'])).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'runner', '--organization-id', knownIds.organization])
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute([
          'get',
          'runner',
          '--organization-id',
          knownIds.organization,
          knownIds.runner
        ])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.runner} | ${withCmd(
            `get runner --organization-id ${knownIds.organization}`
          )}`
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('run', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['get', 'run'])).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'run', '--project-id', knownIds.project])
      ).rejects.toMatchSnapshot();
    });

    test('accepts id as argument', async () => {
      await expect(
        execute(['get', 'run', '--project-id', knownIds.project, knownIds.run])
      ).resolves.toMatchSnapshot();
    });

    test('accepts id from stdin', async () => {
      await expect(
        executeAsIs(
          `echo ${knownIds.run} | ${withCmd(
            `get run --project-id ${knownIds.project}`
          )}`
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
