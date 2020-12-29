import type { Formatter, FormatType } from './formatter';
import jsonFormatter from './jsonFormatter';
import yamlFormatter from './yamlFormatter';
import tableFormatter from './tableFormatter';

const formatterMap: Record<FormatType, Formatter> = {
  json: jsonFormatter,
  yaml: yamlFormatter,
  table: tableFormatter,
};

export default formatterMap;
