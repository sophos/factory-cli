export type FormatType = 'json' | 'yaml' | 'table' | 'log';

// TODO(.): shouldn't formatter accept custom formatter per each field?
export type Formatter = (input: any, fields: string[]) => string;
