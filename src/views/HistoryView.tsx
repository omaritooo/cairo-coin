import { useQuery } from "react-query";
import { BlockLoading } from "src/components/shared/block/BlockLoading";
import { ErrorBlock } from "src/components/shared/block/ErrorBlock";
import { api } from "src/services/api/apiClient";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";
import { modifyHistories } from "src/store/history";
import { HistorySlot } from "src/services/types/history";
import { useTranslation } from "react-i18next";
import { Seo } from "src/services/hooks/useSEO";

export const HistoryView = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useQuery({
    queryKey: ["History view"],
    queryFn: () =>
      api.getHistory({ indicator: "Binance", unit: "Day", period: 7 }),
    onSuccess(data) {
      const newData = data.data.data;
      dispatch(modifyHistories(newData));
    },
    onError(err) {
      console.log(err);
    },
    refetchInterval: import.meta.env.VITE_UPDATE_INTERVAL,
    refetchIntervalInBackground: true,
  });
  const { t } = useTranslation();

  if (isLoading) return <BlockLoading />;
  if (isError) {
    return <ErrorBlock />;
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full px-6 py-6 rounded-lg my-7 bg-light-container dark:bg-dark-container">
      <Seo title="/history" />
      <h1 className="mb-4 text-4xl font-bold dark:text-white">
        {t("history.title")}
      </h1>
      <p className="italic font-thin text-gray-400">
        {t("history.description")}
      </p>
      <div />
      <Chart />
    </div>
  );
};

const Chart = () => {
  const history = useAppSelector((state) => state.history.history);

  return (
    <ResponsiveContainer
      className="self-end px-4 mx-auto mt-auto"
      height={350}
      width="80%"
    >
      <AreaChart
        data={history as HistorySlot[]}
        margin={{
          top: 5,
          right: 50,
          left: 50,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDataOverflow
          dataKey="Time"
          minTickGap={1}
          padding={{
            right: 3,
          }}
          tickCount={1}
          tickMargin={10}
          tickSize={1}
        />
        <YAxis
          domain={([dataMin, dataMax]) => {
            const absMax = Math.floor(dataMax + 1);
            const absMin = Math.floor(dataMin - 1);
            return [absMin, absMax];
          }}
          type="number"
        />

        <Tooltip />
        <Legend />

        <Area
          dataKey="Value"
          fill="url(#colorPv)"
          fillOpacity={1}
          stroke="#8884d8"
          type="monotone"
        />

        {/* <Line dataKey="uv" stroke="#82ca9d" type="monotone" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};
