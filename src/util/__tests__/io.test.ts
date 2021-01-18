import { join } from 'path';

import { readFile, readStdin } from '../io';

describe('io', () => {
  describe('readFile', () => {
    let expected: object;
    beforeAll(() => {
      expected = require('./fixtures/readFile/extected.json');
    });

    test('read JSON file', () => {
      expect(
        readFile(join(__dirname, './fixtures/readFile/test.json'))
      ).toStrictEqual(expected);
    });

    test('read YAML file', () => {
      expect(
        readFile(join(__dirname, './fixtures/readFile/test.yaml'))
      ).toStrictEqual(expected);
    });
  });

  describe.skip('pipe', () => {
    test('should work', () => {
      // TODO: implement test
      const data = readStdin();

      expect(readStdin()).toStrictEqual('test data');
    });
  });
});
