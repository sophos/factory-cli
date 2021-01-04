import { executeWithStdoutOnly } from '../helpers/execute';
import { fixtures, loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl create', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['create'])).rejects.toContain(
      'Command must be specified'
    );
  });
});

describe('refactrctl create pipeline-revision', () => {});

describe('refactrctl create pipeline', () => {
  test('throws on missing --project-id', async () => {
    await expect(
      executeWithStdoutOnly(['create', 'pipeline'])
    ).rejects.toContain('Missing required argument: project-id');
  });
});
