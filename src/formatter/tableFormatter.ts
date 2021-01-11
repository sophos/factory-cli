import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import Table from 'cli-table';

import humanify from './humanify';
import { Formatter } from './formatter';

type Row = { [key: string]: any };
type Input = Row | Row[] | null;

const tableFormatter: Formatter = function tableFormatter(
  input: Input,
  fields: string[]
): string {
  if (isNil(input) || input.length === 0) {
    return 'No data returned!';
  }

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
