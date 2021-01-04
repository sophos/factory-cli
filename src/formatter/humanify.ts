import isDate from 'lodash/isDate';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import formatDate from 'date-fns/format';
import localeEN from 'date-fns/locale/en-US';

const tryParseDate = (value: any): any => {
  const maybeDate = parseISO(value);
  if (isValid(maybeDate)) {
    return maybeDate;
  }

  return value;
};

export default function humanify(value: any) {
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
  formatDate(value, 'Pp', { locale: localeEN });

const humanifyObject = (value: { [key: string]: any }) => JSON.stringify(value);
const humanifyBoolean = (value: boolean) => (value ? 'Yes' : 'No');
