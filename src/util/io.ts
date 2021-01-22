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
  const fd = process.stdin.fd;

  // https://unix.stackexchange.com/questions/382849/determine-if-process-is-connected-to-another-process-via-pipes
  let isPiped = false;
  try {
    const stat = fs.fstatSync(fd);
    isPiped = stat.isFIFO();
  } catch (_) {
    // if error is occurred `isPipe` is set to false and if-block next to current
    // will handle the case.
  }

  // Do not try to read from stdin if isn't piped.
  if (!isPiped) {
    return;
  }

  const bufferSize = 2 ** 16;
  const buf = Buffer.alloc(bufferSize);
  const chunks = [];

  while (1) {
    let readBytes = 0;
    try {
      readBytes = fs.readSync(fd, buf, 0, bufferSize, null);
    } catch (err) {
      if (err.code === 'EAGAIN') {
        continue;
      } else {
        // Ignore stdin on error.
        return;
      }
    }

    if (readBytes === 0) {
      break;
    }

    const chunk = Buffer.alloc(readBytes);
    buf.copy(chunk, 0, 0, readBytes);

    chunks.push(chunk);
  }

  const data = Buffer.concat(chunks);
  const input = data.toString('utf-8').trim();

  try {
    // Try to parse as file.
    return JSON.parse(input);
  } catch (err) {
    // empty
  }

  return input;
}
