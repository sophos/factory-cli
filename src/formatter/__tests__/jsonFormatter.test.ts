import jsonFormatter from '../jsonFormatter';

describe('jsonFormatter', () => {
  test('formats data as YAML', () => {
    // Number
    expect(jsonFormatter(0, [])).toMatchSnapshot();

    // String
    expect(jsonFormatter('foobarbaz', [])).toMatchSnapshot();

    // Boolean
    expect(jsonFormatter(true, [])).toMatchSnapshot();
    expect(jsonFormatter(false, [])).toMatchSnapshot();

    // Array
    expect(
      jsonFormatter(
        [
          {
            a: 1,
            b: 2,
            c: 3
          },
          { a: 4, b: 5, c: 6 }
        ],
        ['a', 'b', 'c']
      )
    ).toMatchSnapshot();

    // Object
    expect(
      jsonFormatter(
        {
          a: 1,
          b: 2,
          c: 3
        },
        ['a', 'b', 'c']
      )
    ).toMatchSnapshot();
  });

  // TODO(.): should be implement field omit functionality for JSON formatter?
  test.skip('omits data fields if not presented in `fields` argument', () => {
    expect(
      jsonFormatter([{ foo: 'foo', bar: 'bar', baz: 'baz' }], ['foo', 'bar'])
    ).toMatchSnapshot();
  });
});
