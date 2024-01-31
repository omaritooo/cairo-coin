import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import {
  Bank,
  BinanceAndBlackMarket,
  CIB,
  CreditRating,
  ForeignCurrencyBlackMarket,
  Gold,
  HomeData,
  Indicator,
} from "src/services/types";

interface Header {
  indicator: number | string;
  binance: number;
  blackMarket: number;
  official: Bank;
}

interface HomeState {
  headers: Header | null;
  indicator: Indicator | null;
  binance: BinanceAndBlackMarket | null;
  blackMarket: BinanceAndBlackMarket | null;
  officialRate: Bank | null;
  cib: CIB | null;
  gold: Gold | null;
  foreignCurrencies: ForeignCurrencyBlackMarket | null;
  creditRating: CreditRating | null;
}

const initialState: HomeState = {
  binance: null,
  blackMarket: null,
  headers: null,
  cib: null,
  gold: null,
  foreignCurrencies: null,
  creditRating: null,
  officialRate: null,
  indicator: null,
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    modifyData: (state: HomeState, action: PayloadAction<HomeData>) => {
      const { payload } = action;
      if (!payload) return;

      if (state.binance || state.blackMarket) {
        Object.keys(state).forEach((el) => {
          state[el as keyof typeof state] = null;
        });
      }
      state.binance = payload.Binance;
      state.blackMarket = payload.BlackMarket;
      state.cib = payload.CIBArbitrage;
      state.creditRating = payload.CreditRating;
      state.foreignCurrencies = payload.ForeignCurrency;
      state.officialRate = payload.OfficialExchangeRate;
      state.gold = payload.Gold;
      state.indicator = payload.Indicator;
      state.headers = {
        indicator: payload.Indicator.Value,
        binance: payload.Binance.Trading.Buy,
        blackMarket: payload.BlackMarket.Trading.Buy,
        official: payload.OfficialExchangeRate,
      };
    },
  },
});

export const { modifyData } = homeSlice.actions;
export const indicator = (state: RootState) => state.home.indicator;

export default homeSlice.reducer;
