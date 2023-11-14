/* eslint-disable @typescript-eslint/no-explicit-any */
import yaml, { LoadOptions } from 'js-yaml';

export default function parseOutput(
  value: string,
  options?: LoadOptions
): Record<string, any> {
  try {
    const obj = yaml.load(value, options) as Record<string, any>;
    return obj;
  } catch (error: any) {
    console.debug('Cannot parse command output as YAML or JSON');
    console.debug(`Output: ${value}`);
    throw new Error(
      `Error in JSON.parse. ${JSON.stringify(
        { message: error.message, output: value },
        null,
        2
      )}`
    );
  }
}

export const asJson: LoadOptions = { json: true };
