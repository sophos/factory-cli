import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import Table from 'cli-table';

import humanify from './humanify';
import { Formatter } from './formatter';

type Row = { [key: string]: unknown };
type Input = Row | Row[] | null;

const formatterChars = {
  'top': '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  'bottom': '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  'left': '',
  'left-mid': '',
  'mid': '',
  'mid-mid': '',
  'right': '',
  'right-mid': '',
  'middle': '  '
};

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
    fields.reduce<unknown[]>((acc, field) => {
      const value = row[field];
      acc.push(humanify(value));

      return acc;
    }, [])
  );

  const table = new Table({
    head: fields,
    chars: formatterChars,
    style: { 'padding-left': 0, 'padding-right': 0 },
    colors: !isString(process.env.NO_COLOR) && process.env.NO_COLOR !== ''
  });

  table.push(...rows);

  return table.toString();
};

export default tableFormatter;
