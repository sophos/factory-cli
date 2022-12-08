import { dump } from 'js-yaml';

import { Formatter } from './formatter';

const yamlFormatter: Formatter = (input: unknown): string => {
  return dump(input, {
    indent: 4
  });
};

export default yamlFormatter;
