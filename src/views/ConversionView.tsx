import { useEffect, useState } from "react";
import { api } from "src/services/api/apiClient";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";
import { modifyCurrencies, modifyHeaders } from "src/store/calculator";
import { NavigationTabs } from "src/components/shared/NavigationTabs";
import { Tabs } from "src/services/types/ui";
import { BlockConversion } from "src/components/shared/block/BlockConversion";
import { AnimatePresence, motion } from "framer-motion";
import { Seo } from "src/services/hooks/useSEO";

const variants = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: {
    type: "spring",
    damping: 5,
    opacity: {
      delay: 0.5,
    },
  },
};
const BuySellTabs: Tabs[] = [
  {
    name: "Buy",
    id: 0,
  },
  {
    name: "Sell",
    id: 1,
  },
];

const PlatformTabs: Tabs[] = [
  {
    name: "Black Market",
    id: 0,
  },
  {
    name: "Binance",
    id: 1,
  },
];
export const ConversionView = () => {
  const dispatch = useAppDispatch();
  const binance = useAppSelector((state) => state.calculator.binance);
  const blackMarket = useAppSelector((state) => state.calculator.blackMarket);
  const [platform, setPlatform] = useState<string>(PlatformTabs[0].name);
  const [transaction, setTransaction] = useState<string>(BuySellTabs[0].name);

  const [list, setList] = useState<{ [value: string]: number } | null>(null);
  const transactionReceiver = (e: Tabs) => {
    setTransaction(e.name);
  };
  const platformReceiver = (e: Tabs) => {
    setPlatform(e.name);
  };
  const { isLoading, isError } = useQuery({
    queryKey: ["Conversion rates"],
    queryFn: () => api.getCurrency(),
    onSuccess(data) {
      const { header, data: res } = data.data;

      dispatch(modifyCurrencies(res));
      if (header) {
        dispatch(modifyHeaders(header));
      }
    },
    onError: (error) => {
      console.log(error);
    },
    refetchInterval: import.meta.env.VITE_UPDATE_INTERVAL,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (!binance || !blackMarket) {
      return;
    }
    const tempPlatform = platform === "Binance" ? binance : blackMarket;
    const tempList =
      transaction === "Buy" ? tempPlatform.Buy : tempPlatform.Sell;
    setList(tempList);
  }, [list, binance, blackMarket]);

  return (
    <div className="flex-1 w-full px-6 py-6 rounded-lg bg-light-container bg-opacity-70 my-7 dark:bg-dark-container">
      <Seo title="/conversion" />

      <AnimatePresence>
        {isLoading || !list ? (
          <motion.div
            {...variants}
            className="flex items-center justify-center h-full"
          >
            <div className="w-20 h-20 rounded-full bg-violet-800 animate-ping" />
          </motion.div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <motion.div className="flex flex-col flex-1 h-full" {...variants}>
            <motion.div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
              <NavigationTabs
                Tabs={BuySellTabs}
                emitTab={transactionReceiver}
              />
              <NavigationTabs Tabs={PlatformTabs} emitTab={platformReceiver} />
            </motion.div>
            <BlockConversion list={list} loading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
