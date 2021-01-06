import type { Formatter, FormatType } from './formatter';
import jsonFormatter from './jsonFormatter';
import yamlFormatter from './yamlFormatter';
import tableFormatter from './tableFormatter';
import logFormatter from './logFormatter';

const formatterMap: Record<FormatType, Formatter> = {
  json: jsonFormatter,
  yaml: yamlFormatter,
  table: tableFormatter,
  log: logFormatter
};

export default formatterMap;
