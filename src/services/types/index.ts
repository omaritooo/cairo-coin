import { COUNTRIES } from "src/countries";

export interface X {
  Rate: number;
  Index: number;
}

interface Trading {
  Buy: number;
  Sell: number;
}

interface Rate {
  BuyChangeRate: number;
  SellChangeRate: number;
}

export interface BinanceAndBlackMarket {
  Trading: Trading;
  Rate: Rate;
}

export interface ForeignCurrencyBlackMarket {
  OfficialExchangeRate: {
    [value: string]: number;
  };
  BlackMarket: {
    [value: string]: number;
  };
}

export interface Bank {
  Price: number;
  Rate: number;
}

export interface CIB {
  Data: {
    S2S: number;
    Rate: number;
  };
  Details: {
    Stocks: {
      COMI: number;
      CBKD: number;
    };
    Market: {
      Egypt: boolean;
      London: boolean;
    };
  };
}

export interface Gold {
  Gram: {
    Buy: { [key: string]: number };
    Sell: { [key: string]: number };
    Rate: { [key: string]: number };
    GlobalPrice: { [key: string]: number };
  };
  Dollar: {
    Price: number;
    Rate: number;
  };
  Ingot: {
    Buy: {
      [key: string]: number;
    };
    Sell: {
      [key: string]: number;
    };
  };
}

interface CreditRatingCategory {
  Rating: string;
  Outlook: string;
  Date: string;
}

export interface CreditRating {
  "S&P": CreditRatingCategory;
  "Moody's": CreditRatingCategory;
}

export interface HomeData {
  X: X;
  Binance: BinanceAndBlackMarket;
  BlackMarket: BinanceAndBlackMarket;
  OfficialExchangeRate: Bank;
  ForeignCurrency: ForeignCurrencyBlackMarket;
  Cib: CIB;
  Gold: Gold;
  CreditRating: CreditRating;
}

export type SelectMenuOption = (typeof COUNTRIES)[number];
