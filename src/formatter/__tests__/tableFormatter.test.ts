import tableFormatter from '../tableFormatter';

describe('tableFormatter', () => {
  test('formats data as ASCII table', () => {
    // Array
    expect(
      tableFormatter(
        [
          {
            a: 1,
            b: 2,
            c: 3,
          },
          { a: 4, b: 5, c: 6 },
        ],
        ['a', 'b', 'c']
      )
    ).toMatchSnapshot();

    // Single row
    expect(
      tableFormatter(
        {
          a: 1,
          b: 2,
          c: 3,
        },
        ['a', 'b', 'c']
      )
    ).toMatchSnapshot();
  });

  test('omits data fields if not presented in `fields` argument', () => {
    expect(
      tableFormatter([{ foo: 'foo', bar: 'bar', baz: 'baz' }], ['foo', 'bar'])
    ).toMatchSnapshot();
  });
});
