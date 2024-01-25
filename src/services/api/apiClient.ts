import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { HomeData } from "../types";
import { CalculatorData, CalculatorHeader } from "../types/calculator";

// const headers = {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
// };

type BaseResponse<T, V> = {
  message: string;
  status: string;
  header?: V;
  data: T;
};

const signal = new AbortController();
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2000,
  signal: signal.signal,
});

const getData = async (): Promise<
  AxiosResponse<BaseResponse<HomeData, null>, AxiosError>
> => {
  const response = await apiClient.get("/");
  return response;
};

interface HistoryParams {
  indicator:
    | "Binance"
    | "BlackMarket"
    | "BankRate"
    | "Rub2Egp"
    | "CIB"
    | "Gold24"
    | "Gold21"
    | "GoldDollar"
    | "GoldGlobal";
  unit?: "Month" | "Day" | "Hour";
  period?: number;
}
const getHistory = async ({
  indicator = "Binance",
  unit = "Day",
  period = 50,
}: HistoryParams) => {
  const response = await apiClient.get("/history", {
    params: {
      Indicator: indicator,
      Unit: unit,
      Period: period,
    },
  });
  return response;
};

const getCurrency = async (): Promise<
  AxiosResponse<BaseResponse<CalculatorData, CalculatorHeader>>
> => {
  const response = await apiClient.get("/calculator");
  return response;
};

export const api = {
  getHistory,
  getData,
  getCurrency,
};
