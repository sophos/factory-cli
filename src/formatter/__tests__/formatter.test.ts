import formatter from '../index';
import yamlFormatter from '../yamlFormatter';
import jsonFormatter from '../jsonFormatter';
import tableFormatter from '../tableFormatter';

const fields = ['foo', 'bar', 'baz', 'xyz', 'qux', 'quux', 'quuz'];
const data = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
  xyz: null,
  qux: new Date('2021-01-04T13:08:25.618Z'),
  quux: 1.234,
  quuz: {},
};

describe('formatter', () => {
  it('formats to YAML correctly', () => {
    const format = formatter('yaml', fields);

    expect(format(data)).toBe(yamlFormatter(data, fields));
    expect(format(data)).toMatchSnapshot();
  });

  it('formats to JSON correctly', () => {
    const format = formatter('json', fields);

    expect(format(data)).toBe(jsonFormatter(data, fields));
    expect(format(data)).toMatchSnapshot();
  });

  it('formats to table correctly', () => {
    const format = formatter('table', fields);

    expect(format(data)).toBe(tableFormatter(data, fields));
    expect(format(data)).toMatchSnapshot();
  });
});
