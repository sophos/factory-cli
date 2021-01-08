import { executeWithStdoutOnly } from '../helpers/execute';

describe('refactrctl get', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['get'])).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['get', 'credential'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['get', 'job'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['get', 'pipeline-revision'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['get', 'pipeline'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['get', 'runner'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('run', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['get', 'run'])
      ).rejects.toMatchSnapshot();
    });
  });
});
