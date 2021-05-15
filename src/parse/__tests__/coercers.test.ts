import { join } from 'path';
import { promises as fs } from 'fs';
import {
  coercePipelineCreateInput,
  coerceRunPipelineVariables
} from '../coercers';

describe('coercers', () => {
  describe('coercePipelineCreateInput', () => {
    const fixturePaths = {
      json: join(__dirname, './fixtures/coercePipelineCreateInput/test.json'),
      yaml: join(__dirname, './fixtures/coercePipelineCreateInput/test.yaml')
    };
    let expected: Record<string, unknown>;
    beforeAll(() => {
      expected = require('./fixtures/coercePipelineCreateInput/extected.json');
    });

    test('throws when array is passed', () => {
      expect(() =>
        coercePipelineCreateInput(['@./arg'])
      ).toThrowErrorMatchingSnapshot();
    });

    test('read JSON input string', async () => {
      expect(
        coercePipelineCreateInput(await fs.readFile(fixturePaths.json, 'utf8'))
      ).toStrictEqual(expected);
    });

    test('read YAML input string', async () => {
      expect(
        coercePipelineCreateInput(await fs.readFile(fixturePaths.yaml, 'utf8'))
      ).toStrictEqual(expected);
    });

    test('read JSON file', () => {
      expect(coercePipelineCreateInput(`@${fixturePaths.json}`)).toStrictEqual(
        expected
      );
    });

    test('read YAML file', () => {
      expect(coercePipelineCreateInput(`@${fixturePaths.yaml}`)).toStrictEqual(
        expected
      );
    });
  });

  describe('coerceRunPipelineVariables', () => {
    test('throws on invalid format', () => {
      expect(() =>
        coerceRunPipelineVariables('foo')
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables('foo:')
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables('')
      ).toThrowErrorMatchingSnapshot();
    });

    test('throws on invalid value format', () => {
      expect(() =>
        coerceRunPipelineVariables('foo:bar:')
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables('foo::')
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables('foo:bar:baz')
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables(['foo:bar:baz', 'foo:bar', 'xyz:::'])
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables('foo:bar')
      ).toThrowErrorMatchingSnapshot();
      expect(() =>
        coerceRunPipelineVariables('foo:{baz}')
      ).toThrowErrorMatchingSnapshot();
    });

    test('accepts valid JSON value', () => {
      expect(coerceRunPipelineVariables('foo:"bar"')).toStrictEqual({
        foo: 'bar'
      });
      expect(coerceRunPipelineVariables('foo:["bar"]')).toStrictEqual({
        foo: ['bar']
      });
      expect(
        coerceRunPipelineVariables([
          'foo:{"bar":"bar"}',
          'bar:123',
          'baz:"xyz"',
          'xyz:["foo","bar","baz"]'
        ])
      ).toStrictEqual({
        foo: { bar: 'bar' },
        bar: 123,
        baz: 'xyz',
        xyz: ['foo', 'bar', 'baz']
      });
    });
  });
});
