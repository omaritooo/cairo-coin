import { useQuery } from "react-query";
import { BlockLoading } from "src/components/shared/block/BlockLoading";
import { ErrorBlock } from "src/components/shared/block/ErrorBlock";
import { api } from "src/services/api/apiClient";
import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";
import { modifyHistories } from "src/store/history";
import { useTranslation } from "react-i18next";
import { Seo } from "src/services/hooks/useSEO";
import { BaseSelector } from "src/components/ui/Input/BaseSelector";
import { useEffect, useMemo, useState } from "react";
import { BlockChart } from "src/components/shared/block/BlockChart";
import { HistorySlot } from "src/services/types/history";

const durations = [
  { name: "Day", value: "day" },
  { name: "Week", value: "week" },
  { name: "Month", value: "month" },
  { name: "3 Months", value: "3M" },
  { name: "Year", value: "year" },
  { name: "24 Hours", value: "24H" },
];

const indicators = [
  { name: "Binance", value: "Binance" },
  { name: "Black Market", value: "BlackMarket" },
  { name: "Bank Rate", value: "BankRate" },
  { name: "CIB", value: "CIB" },
  { name: "Gold24", value: "Gold24" },
  { name: "Gold21", value: "Gold21" },
  { name: "Gold Dollar", value: "GoldDollar" },
  { name: "Gold Global", value: "GoldGlobal" },
];

const extractHour = (dataEntry: HistorySlot) => {
  const dateObject = new Date(dataEntry.Time);

  const hours = dateObject.getUTCHours();
  return {
    Time: hours < 10 ? `0${hours}:00` : `${hours}` + ":00",
    Value: dataEntry.Value,
  };
};
export const HistoryView = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.history);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["History view"],
    queryFn: () =>
      api.getHistory({
        indicator: changedValues.indicator,
        unit: unit.interval,
        period: unit.unit,
      }),
    onSuccess(data) {
      let newData;
      if (unit.interval == "Hour") {
        newData = data.data.data.map(extractHour);
        dispatch(modifyHistories({ history: newData, date: true }));
      } else newData = data.data.data;
      dispatch(modifyHistories({ history: newData, date: false }));
    },
    onError(err) {
      console.log(err);
    },
    refetchInterval: import.meta.env.VITE_UPDATE_INTERVAL,
    refetchIntervalInBackground: true,
  });
  const { t } = useTranslation();
  const [toggles, setToggles] = useState({
    toggleDuration: false,
    toggleIndicator: false,
  });
  const [changedValues, setChangedValues] = useState({
    duration: "day",
    indicator: "Binance",
  });

  const unit = useMemo(() => {
    const newVal = changedValues.duration;
    if (newVal == "day") {
      return {
        unit: 24,
        interval: "Hour",
        intervals: 4,
      };
    } else if (newVal == "week") {
      return {
        unit: 7,
        interval: "Day",
        intervals: 1,
      };
    } else if (newVal == "month") {
      return {
        unit: 30,
        interval: "Day",
        intervals: 7,
      };
    } else if (newVal == "3M") {
      return { unit: 90, interval: "Day", intervals: 14 };
    } else if (newVal == "year") {
      return { unit: 365, interval: "Day", intervals: 30 };
    } else return { unit: 24, interval: "Hour", intervals: 4 };
  }, [changedValues]);

  useEffect(() => {
    refetch();
  }, [changedValues, refetch]);
  if (isLoading) return <BlockLoading />;
  if (isError || !history) {
    return <ErrorBlock />;
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full py-6 rounded-lg lg:px-6 my-7 bg-light-container dark:bg-dark-container">
      <Seo title="/history" />
      <h1 className="mb-4 text-4xl font-bold dark:text-white">
        {t("history.title")}
      </h1>
      <p className="px-4 italic font-thin text-gray-400 ">
        {t("history.description")}
      </p>
      <div />
      <div className="flex mt-6 gap-x-4">
        <BaseSelector
          id="duration-selector"
          onChange={(e) => {
            setChangedValues({ ...changedValues, duration: e.value });
          }}
          onToggle={() =>
            setToggles({ ...toggles, toggleDuration: !toggles.toggleDuration })
          }
          open={toggles.toggleDuration}
          selectedValue={durations.find(
            (el) => el.value == changedValues.duration
          )}
          values={durations}
        />
        <BaseSelector
          id="indicator-selector"
          onChange={(e) => {
            setChangedValues({ ...changedValues, indicator: e.value });
          }}
          onToggle={() =>
            setToggles({
              ...toggles,
              toggleIndicator: !toggles.toggleIndicator,
            })
          }
          open={toggles.toggleIndicator}
          selectedValue={indicators.find(
            (el) => el.value == changedValues.indicator
          )}
          values={indicators}
        />
      </div>
      <div className="w-full mt-10 overflow-scroll md:mt-auto">
        <BlockChart data={history} intervals={unit?.intervals} />
      </div>
    </div>
  );
};
