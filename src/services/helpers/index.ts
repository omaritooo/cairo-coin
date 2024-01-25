export const toFixedWithCommas = (value: string, dp: number) => {
  // Convert the value to a float and round it to the specified number of decimal places
  const roundedValue = +parseFloat(value).toFixed(dp);

  // Convert the rounded value to a string
  const stringValue = roundedValue.toString();

  // Split the string into integer and decimal parts (if any)
  const [integerPart, decimalPart] = stringValue.split(".");

  // Add commas to the integer part every 3 digits
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part with the decimal part (if any)
  const result = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return result;
};
