export interface CalculatorHeader {
  Language: {
    english: {
      [key: string]: string;
    };
    arabic: {
      [key: string]: string;
    };
  };
}

export interface Currency {
  [key: string]: number;
}

export interface CalculatorPlatform {
  Buy: number;
  Sell: number;
}

export interface CalculatorData {
  Binance: CalculatorPlatform;
  BlackMarket: CalculatorPlatform;
}
