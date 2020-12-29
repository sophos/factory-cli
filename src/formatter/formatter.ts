export type FormatType = 'json' | 'yaml' | 'table';
export type Formatter = (input: any, fields: string[]) => string;
