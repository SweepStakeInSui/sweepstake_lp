export const leadingZeroesNumber = (val: number, decimal: number = 2) => {
  const maxNumber = 10 ** decimal - 1;
  const valString = val.toString();
  if (val < maxNumber) {
    const leadingZeroes = '0'.repeat(decimal - valString.length);
    return leadingZeroes + valString;
  }
  return valString;
};
