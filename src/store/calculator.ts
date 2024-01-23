import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import {
  CalculatorData,
  CalculatorHeader,
  CalculatorPlatform,
  Currency,
} from "src/services/types/calculator";

export interface Filter {
  Buy: { [key: string]: number };
  Sell: { [key: string]: number };
}

interface CalculatorState {
  binance: Filter | null;
  blackMarket: Filter | null;
  headers: CalculatorHeader | null;
}

const filter = (e: CalculatorPlatform) => {
  const obj: Filter = { Buy: {}, Sell: {} };
  Object.entries(e).map((el: [string, Currency]) => {
    obj.Buy[el[0] as keyof typeof obj] = el[1]["Buy"];
    obj.Sell[el[0]] = el[1]["Sell"];
  });
  return obj;
};
const initialState: CalculatorState = {
  binance: null,
  blackMarket: null,
  headers: null,
};

export const calculatorSlice = createSlice({
  name: "calculatorSlice",
  initialState,
  reducers: {
    modifyCurrencies: (
      state: CalculatorState,
      action: PayloadAction<CalculatorData>
    ) => {
      if (state.binance || state.blackMarket) {
        state.binance = null;
        state.blackMarket = null;
      }
      const { Binance, BlackMarket } = action.payload;

      state.binance = filter(Binance);
      state.blackMarket = filter(BlackMarket);
    },
    modifyHeaders: (
      state: CalculatorState,
      action: PayloadAction<CalculatorHeader>
    ) => {
      state.headers = action.payload;
    },
  },
});

export const { modifyCurrencies, modifyHeaders } = calculatorSlice.actions;
export const binance = (state: RootState) => state.calculator.binance;
export const blackMarket = (state: RootState) => state.calculator.blackMarket;

export default calculatorSlice.reducer;
