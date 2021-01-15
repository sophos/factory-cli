export const withAddress = (args: string[]): string[] => {
  const ret = [...args];
  ret.push('--address', 'http://api.devel.refactr.it/v1');

  return ret;
};

export const withFormat = (
  args: string[],
  format: 'json' | 'yaml' | 'wide'
) => {
  const ret = [...args];
  ret.push('--format', format);

  return ret;
};

export const withCmd = (args: string) => {
  return `${process.env.__REFACTR_COMMAND__} ${args}`;
};
