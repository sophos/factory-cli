import yamlFormatter from '../yamlFormatter';

describe('yamlFormatter', () => {
  test('formats data as YAML', () => {
    // Number
    expect(yamlFormatter(0, [])).toMatchSnapshot();

    // String
    expect(yamlFormatter('foobarbaz', [])).toMatchSnapshot();

    // Boolean
    expect(yamlFormatter(true, [])).toMatchSnapshot();
    expect(yamlFormatter(false, [])).toMatchSnapshot();

    // Array
    expect(
      yamlFormatter(
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
      yamlFormatter(
        {
          a: 1,
          b: 2,
          c: 3
        },
        ['a', 'b', 'c']
      )
    ).toMatchSnapshot();
  });

  // TODO(.): should we implement field omitting functionality for YAML formatter?
  test.skip('omits data fields if not presented in `fields` argument', () => {
    expect(
      yamlFormatter([{ foo: 'foo', bar: 'bar', baz: 'baz' }], ['foo', 'bar'])
    ).toMatchSnapshot();
  });
});
