import { join } from 'path';

import { readPipelineFile } from '../io';

describe('io', () => {
  describe('readFile', () => {
    let expected: Record<string, unknown>;
    beforeAll(() => {
      expected = require('./fixtures/readFile/extected.json');
    });

    test('read JSON file', () => {
      expect(
        readPipelineFile(join(__dirname, './fixtures/readFile/test.json'))
      ).toStrictEqual(expected);
    });

    test('read YAML file', () => {
      expect(
        readPipelineFile(join(__dirname, './fixtures/readFile/test.yaml'))
      ).toStrictEqual(expected);
    });
  });
});
