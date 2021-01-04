import fs from 'fs';
import { load } from 'js-yaml';

/**
 * Reads and parses input file either as YAML or JSON.
 * @param path
 */
export function readFile(path: string) {
  const input = fs.readFileSync(path, { encoding: 'utf-8' });

  return parseInput(input, path);
}

/**
 * Read and parses input data.
 * @param input
 * @param path
 */
export function parseInput(input: string, path?: string) {
  return load(input, {
    filename: path,
    json: true,
  });
}
