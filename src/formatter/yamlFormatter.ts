import { safeDump } from 'js-yaml';

export default function yamlFormatter(input): string {
  return safeDump(input, {
    indent: 4,
  });
}
