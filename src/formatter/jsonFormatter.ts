import { Formatter } from './formatter';

const jsonFormatter: Formatter = function jsonFormatter(input: any): string {
  try {
    return JSON.stringify(input, null, 4);
  } catch (err) {
    return input;
  }
};

export default jsonFormatter;
