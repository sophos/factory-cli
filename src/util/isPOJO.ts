const toString = Object.prototype.toString;
export const isPOJO = (obj: unknown): obj is Record<string, any> => {
  return toString.call(obj) === '[object Object]';
};
