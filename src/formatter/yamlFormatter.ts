import { safeDump } from 'js-yaml';

export default function yamlFormatter(input: any): string {
  return safeDump(input, {
    indent: 4,
  });
}
