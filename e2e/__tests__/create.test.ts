import { executeWithStdoutOnly } from '../helpers/execute';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl create', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['create'])).rejects.toMatchSnapshot();
  });
});

describe('refactrctl create pipeline-revision', () => {});

describe('refactrctl create pipeline', () => {
  test('throws on missing required arguments', async () => {
    await expect(
      executeWithStdoutOnly(['create', 'pipeline'])
    ).rejects.toMatchSnapshot();
  });
});
