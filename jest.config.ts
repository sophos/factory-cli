import type { Config } from '@jest/types';

process.env.TZ = 'UTC';
process.env.NO_COLOR = 'true';

const config: Config.InitialOptions = {
  testRegex: '.*\\.test\\.(js|ts)$'
};

export default config;
