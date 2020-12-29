import isDate from 'lodash/isDate';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import Table from 'cli-table';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

type Row = { [key: string]: any };
type Input = Row | Row[];

export default function tableFormatter(input: Input, fields: string[]): string {
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
}

const tryParseDate = (value: any): any => {
  const maybeDate = parseISO(value);
  if (isValid(maybeDate)) {
    return maybeDate;
  }

  return value;
};

function humanify(value: any) {
  value = tryParseDate(value);

  if (isDate(value)) {
    return humanifyDate(value);
  } else if (isBoolean(value)) {
    return humanifyBoolean(value);
  } else if (isObject(value)) {
    return humanifyObject(value);
  } else if (isNil(value) || value === '') {
    return '-';
  }

  return value;
}

const humanifyDate = (value: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(value);

const humanifyObject = (value: { [key: string]: any }) => JSON.stringify(value);
const humanifyBoolean = (value: boolean) => (value ? 'Yes' : 'No');
