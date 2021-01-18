/**
 * Convert asynchronous generator to an array.
 *
 * @param asyncGen Asynchronous generator
 */
export default async function asyncGenToArray(
  asyncGen: AsyncGenerator
): Promise<Array<any>> {
  const arr = [];
  for await (const run of asyncGen) arr.push(run);
  return arr;
}
