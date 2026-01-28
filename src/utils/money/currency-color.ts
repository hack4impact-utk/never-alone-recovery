export const currencyColor = (currencyAmount: number): string => {
  if (currencyAmount < 0) {
    return "red";
  }
  if (currencyAmount === 0) {
    return "black";
  }
  return "green";
};
