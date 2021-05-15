/**
 * Format that is passed to the `--format` option.
 */
export type RawFormatType = 'json' | 'yaml' | 'wide';

export type FormatType = 'json' | 'yaml' | 'table' | 'log';

// TODO(.): shouldn't formatter accept custom formatter per each field?
export type Formatter = (input: unknown, fields: string[]) => string;
