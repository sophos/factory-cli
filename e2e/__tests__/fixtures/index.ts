import { join, sep } from 'path';
import { promises as fs, statSync } from 'fs';

import isNil from 'lodash/isNil';

const readDirectoryDeep = async (path: string): Promise<string[]> => {
  const entities = await fs.readdir(path);

  return (
    await Promise.all(
      entities.map(async (entity) => {
        const fullPath = join(path, entity);

        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          return await readDirectoryDeep(fullPath);
        }

        return fullPath;
      })
    )
  ).flatMap((e) => e);
};

export let fixtures: Map<string, string>;

export async function loadFixtures() {
  if (!isNil(fixtures)) {
    return fixtures;
  }

  const commonPrefix = `${__dirname}${sep}`;
  fixtures = new Map(
    await Promise.all(
      (await readDirectoryDeep(__dirname))
        // Remove self.
        .filter((p) => !p.includes(__filename))
        .map<Promise<[string, string]>>(async (p) => [
          p.replace(commonPrefix, ''),
          await fs.readFile(p, { encoding: 'utf-8' })
        ])
    )
  );

  return fixtures;
}
