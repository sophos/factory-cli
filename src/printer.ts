type Level = 'info' | 'warning' | 'error';

type Options = {
  level: Level;
};

const printerMap: Record<Level, 'info' | 'warn' | 'error'> = {
  info: 'info',
  warning: 'warn',
  error: 'error'
};

export default function printer({ level }: Options) {
  return (input: string): void => {
    console[printerMap[level] ?? 'info'](input);
  };
}
