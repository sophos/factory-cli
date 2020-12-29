import formatterMap from './formatterMap';
import { Formatter, FormatType } from './formatter';

export type { Formatter, FormatType };

export const FORMATTER: FormatType = 'table';

export default function formatter(
  formatType: FormatType = FORMATTER,
  fields: string[]
): Formatter {
  return (input: any): string => {
    return formatterMap[formatType](input, fields);
  };
}
