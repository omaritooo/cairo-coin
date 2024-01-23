// AED: "United Arab Emirates Dirham";
// BHD: "Bahraini Dinar";
// EUR: "Euro";
// GBP: "British Pound";
// JOD: "Jordanian Dinar";
// KWD: "Kuwaiti Dinar";
// OMR: "Omani Rial";
// QAR: "Qatari Rial";
// SAR: "Saudi Riyal";
// USD: "United States Dollar";

export const countryHeaders = [
  {
    country: "Egypt",
    code: "EG",
    currencyCode: "EGP",
    currency: "Egyptian Pound",
  },
  {
    currencyCode: "USD",
    country: "United States of America",
    code: "US",
    currency: "United States Dollar",
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    currencyCode: "AED",
    currency: "United Arab Emirates Dirham",
  },
  {
    country: "Saudi Arabia",
    code: "SA",
    currencyCode: "SAR",
    currency: "Saudi Riyal",
  },
  {
    country: "Qatar",
    code: "QA",
    currencyCode: "QAR",
    currency: "Qatari Ryal",
  },
  {
    country: "Jordan",
    currencyCode: "JOD",
    code: "JO",
    currency: "Jordanian Dinar",
  },
  {
    country: "European Union",
    code: "EU",
    currencyCode: "EUR",
    currency: "Euro",
  },
  {
    country: "Bahrain",
    currencyCode: "BHD",
    code: "BH",
    currency: "Bahraini Dinar",
  },
  {
    country: "Oman",
    currencyCode: "OMR",
    code: "OM",
    currency: "Omani Riyal",
  },

  {
    country: "United Kingdom",
    currencyCode: "GBP",
    code: "GB",
    currency: "Great British Pound",
  },
  {
    country: "Kuwait",
    currencyCode: "KWD",
    code: "KW",
    currency: "Kuwaiti Dinar",
  },
];

export const countryFlags = [
  {
    code: "EG",
    currencyCode: "EGP",
  },
  {
    currencyCode: "USD",

    code: "US",
  },
  {
    code: "AE",
    currencyCode: "AED",
  },
  {
    code: "SA",
    currencyCode: "SAR",
  },
  {
    code: "QA",
    currencyCode: "QAR",
  },
  {
    currencyCode: "JOD",
    code: "JO",
  },
  {
    code: "EU",
    currencyCode: "EUR",
  },
  {
    currencyCode: "BHD",
    code: "BH",
  },
  {
    currencyCode: "OMR",
    code: "OM",
  },

  {
    currencyCode: "GBP",
    code: "GB",
  },
  {
    currencyCode: "KWD",
    code: "KW",
  },
];

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type Country = ArrElement<typeof countryHeaders>;
