/**
 * Convert asynchronous generator to an array.
 *
 * @param asyncGen Asynchronous generator
 */
export default async function asyncGenToArray<T = unknown>(
  asyncGen: AsyncGenerator<T>
): Promise<Array<T>> {
  const arr: T[] = [];
  for await (const run of asyncGen) arr.push(run);
  return arr;
}
