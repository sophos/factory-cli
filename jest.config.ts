import type { Config } from '@jest/types';

process.env.TZ = 'UTC';

const config: Config.InitialOptions = {
  testRegex: '.*\\.test\\.(js|ts)$'
};

export default config;
