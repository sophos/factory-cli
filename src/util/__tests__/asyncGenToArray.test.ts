import asyncGenToArray from '../asyncGenToArray';

describe('asyncGenToArray', () => {
  test('converts asynchronous generator output to array', async () => {
    await expect(
      asyncGenToArray(
        (async function* gen() {
          yield Promise.resolve(1);
          yield Promise.resolve(2);
          yield Promise.resolve(3);
        })()
      )
    ).resolves.toStrictEqual([1, 2, 3]);
  });
});
