export const toFixedIfNecessary = (value: string, dp: number) =>
  +parseFloat(value).toFixed(dp);
