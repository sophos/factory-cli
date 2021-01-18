import humanify from '../humanify';

describe('humanify', () => {
  test('formats date', () => {
    expect(humanify(new Date('2021-01-04T12:34:21.105Z'))).toMatchSnapshot();
  });

  test('formats null/undefined', () => {
    expect(humanify(null)).toMatchSnapshot();
  });

  test('formats number', () => {
    expect(humanify(1.123333333)).toMatchSnapshot();
  });

  test('formats string', () => {
    expect(humanify('string12345')).toMatchSnapshot();
  });

  test('formats boolean', () => {
    expect(humanify(true)).toMatchSnapshot();
    expect(humanify(false)).toMatchSnapshot();
  });

  test('formats objects', () => {
    expect(
      humanify({
        foo: ['foo', 'bar', 'baz'],
        bar: true,
        baz: { xyz: { qux: 'quux' } },
      })
    ).toMatchSnapshot();
  });
});
