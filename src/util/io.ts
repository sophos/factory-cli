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
    json: true
  });
}

/**
 * Read data from stdin.
 */
export function readStdin() {
  if (process.stdin.isTTY) {
    return;
  }

  const bufferSize = 2 ** 16;
  const buf = Buffer.alloc(bufferSize);
  const chunks = [];

  while (1) {
    let readBytes = 0;
    try {
      readBytes = fs.readSync(process.stdin.fd, buf, 0, bufferSize, null);
    } catch (err) {
      // If we cannot read from the stdin, just skip it.
      return;
    }

    if (readBytes === 0) {
      break;
    }

    const chunk = Buffer.alloc(readBytes);
    buf.copy(chunk, 0, 0, readBytes);

    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString('utf-8').trim();
}
