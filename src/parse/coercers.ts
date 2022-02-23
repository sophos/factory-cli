import path from 'path';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import { parsePipelineFile, readPipelineFile } from '../util/io';
import { isPOJO } from '../util/isPOJO';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function coerceRunPipelineVariables(arg: string | string[]) {
  if (!isString(arg) && !isArray(arg)) {
    return;
  }

  if (isString(arg)) {
    arg = [arg];
  }

  return Object.fromEntries(
    arg.flatMap((a) => {
      try {
        const obj = JSON.parse(a);
        if (isPOJO(obj)) {
          return Object.entries(obj as Record<string, unknown>);
        }
      } catch (_) {
        // empty
      }

      const splitIdx = a.indexOf(':');
      if (splitIdx === -1 || a.length - 1 === splitIdx) {
        throw new Error(
          `Invalid variable received \`${a}\`, ` +
            'expected variable to be specified as `key:value` ' +
            'where value must be valid JSON data or valid JSON object.'
        );
      }

      const parts = [a.slice(0, splitIdx), a.slice(splitIdx + 1)];
      const [key, rawValue] = parts;
      let value;
      try {
        value = JSON.parse(rawValue);
      } catch (err) {
        throw new Error(
          `Invalid variable value received in \`${a}\` pair, expected value to be valid JSON.`
        );
      }

      return [[key, value]];
    })
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function coercePipelineCreateInput(arg: string | string[]) {
  if (isArray(arg)) {
    throw new Error('It is not possible to provide multiple data as input!');
  } else if (!isString(arg)) {
    return;
  }

  // If input starts with @ treat input as file path.
  if (arg.startsWith('@')) {
    const filepath = path.resolve(arg.slice(1).trim());
    return readPipelineFile(filepath);
  }

  return parsePipelineFile(arg);
}
