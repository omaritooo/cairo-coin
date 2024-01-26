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

export const indicatorColor = (Value: number) => {
  const abs = Value;
  switch (true) {
    case abs <= 1:
      return "bg-indicator-1";
      break;
    case abs >= 2 && abs < 4:
      return "bg-indicator-2";

      break;
    case abs >= 4 && abs <= 7:
      return "bg-indicator-3";

      break;
    case abs >= 7 && abs < 9:
      return "bg-indicator-4";
      break;
    case abs >= 9 && abs <= 10:
      return "bg-indicator-5";
      break;
    case abs >= -1 && abs < 0:
      return "bg-indicator-1";
    case abs >= -4 && abs < -2:
      return "bg-indicator-2";
    case abs >= -7 && abs <= -4:
      return "bg-indicator-3";
    case abs >= -9 && abs < -7:
      return "bg-indicator-4";
    case abs >= -10 && abs <= -9:
      return "bg-indicator-5";
    default:
      return "bg-black";
  }
};
