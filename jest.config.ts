import type { Config } from '@jest/types';

process.env.TZ = 'UTC';
process.env.NO_COLOR = 'true';

const config: Config.InitialOptions = {
  testMatch: ['**.test.ts', '**.test.int.ts'],
  bail: true
};

export default config;
