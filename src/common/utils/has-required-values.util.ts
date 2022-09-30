export const hasRequiredValues = (requiredList: unknown[]) => {
  for (const item of requiredList) {
    const hasValue = !!item;

    if (!hasValue) {
      return false;
    }
  }

  return true;
};
