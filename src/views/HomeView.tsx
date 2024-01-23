import { AnimatePresence, motion } from "framer-motion";

import { useQuery } from "react-query";

// import { BlockLoading } from "src/components/shared/block/BlockLoading";
import { ErrorBlock } from "src/components/shared/block/ErrorBlock";
import { Card } from "src/components/ui/Card/CardStats";
import { CardSmall } from "src/components/ui/Card/CardSmall";
import { ListCard } from "src/components/ui/Card/ListCard";
// import { StatCard } from "src/components/ui/Card/StatCard";
import { api } from "src/services/api/apiClient";
import { Seo } from "src/services/hooks/useSEO";
import { variants } from "src/services/variants/sidebarVariants";
import { CardIndicator } from "src/components/ui/Card/CardIndicator";

export const HomeView = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Home page"],
    queryFn: () => api.getData(),
    refetchInterval: import.meta.env.VITE_UPDATE_INTERVAL,
    refetchIntervalInBackground: true,
  });

  // if (isLoading) return <BlockLoading />;
  if (isError) {
    return <ErrorBlock />;
  }

  return (
    <div className="flex-1 w-full py-2 my-2 rounded-lg ">
      <Seo title="/" />
      <AnimatePresence>
        {data ? (
          <motion.div
            className="grid w-full grid-cols-8 space-y-0 gap-y-7 h-fit gap-x-4 grid-flow-dense "
            {...variants}
          >
            <div className="flex flex-row col-span-8 gap-x-2">
              <Card
                loading={isLoading}
                name="Binance"
                platform={data.data.data.Binance}
              />
              <Card
                loading={isLoading}
                name="Black Market"
                platform={data.data.data.BlackMarket}
              />
              <CardSmall
                loading={isLoading}
                name="Official Rate"
                price={data.data.data.OfficialExchangeRate.Price}
                rate={data.data.data.OfficialExchangeRate.Rate}
              />
              <CardIndicator />
            </div>

            <div className="flex flex-row col-span-4 gap-x-2">
              <ListCard
                list={data.data.data.ForeignCurrency.OfficialExchangeRate}
                name="Foreign Currency"
                subtitle="Official Rate"
              />
              <ListCard
                list={data.data.data.ForeignCurrency.BlackMarket}
                name="Foreign Currency"
                subtitle="Black Market"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
