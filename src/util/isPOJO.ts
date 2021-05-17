const toString = Object.prototype.toString;
export const isPOJO = (obj: unknown): obj is Record<string, unknown> => {
  return toString.call(obj) === '[object Object]';
};
