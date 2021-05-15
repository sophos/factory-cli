import formatDate from 'date-fns/format';
import isValid from 'date-fns/isValid';
import localeEN from 'date-fns/locale/en-US';
import parseISO from 'date-fns/parseISO';
import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

const tryParseDate = <T = unknown>(value: T): T | Date => {
  if (isString(value)) {
    const maybeDate = parseISO(value);
    if (isValid(maybeDate)) {
      return maybeDate;
    }
  }

  return value;
};

export default function humanify<T = unknown>(value: T): T | string {
  const maybeDateValue = tryParseDate(value);

  if (isDate(maybeDateValue)) {
    return humanifyDate(maybeDateValue);
  } else if (isBoolean(value)) {
    return humanifyBoolean(value);
  } else if (isObject(value)) {
    return humanifyObject(value as Record<string, unknown>);
  } else if (isNil(value) || (isString(value) && value === '')) {
    return '-';
  }

  return value;
}

const humanifyDate = (value: Date) =>
  formatDate(value, 'Pp', { locale: localeEN });

const humanifyObject = (value: { [key: string]: unknown }) =>
  JSON.stringify(value);
const humanifyBoolean = (value: boolean) => (value ? 'Yes' : 'No');
