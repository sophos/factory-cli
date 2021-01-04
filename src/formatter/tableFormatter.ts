import isArray from 'lodash/isArray';
import Table from 'cli-table';

import humanify from './humanify';
import { Formatter } from './formatter';

type Row = { [key: string]: any };
type Input = Row | Row[];

const tableFormatter: Formatter = function tableFormatter(
  input: Input,
  fields: string[]
): string {
  if (!isArray(input)) {
    input = [input];
  }

  const rows = (input as Row[]).map((row) =>
    fields.reduce<any[]>((acc, field) => {
      const value = row[field];
      acc.push(humanify(value));

      return acc;
    }, [])
  );

  const table = new Table({ head: fields });

  table.push(...rows);

  return table.toString();
};

export default tableFormatter;
