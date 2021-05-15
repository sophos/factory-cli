import { Formatter } from './formatter';

const jsonFormatter: Formatter = <T = unknown>(input: T): T | string => {
  try {
    return JSON.stringify(input, null, 4);
  } catch (_) {
    return input;
  }
};

export default jsonFormatter;
