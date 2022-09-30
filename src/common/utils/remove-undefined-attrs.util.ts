export const removeAllUndefinedAttrs = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};
