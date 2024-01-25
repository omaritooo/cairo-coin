import { motion } from "framer-motion";
import { CardDetails } from "src/components/ui/Card/CardDetails";
import { CardIndicator } from "src/components/ui/Card/CardIndicator";
import { CardSmall } from "src/components/ui/Card/CardSmall";
import { CardStats } from "src/components/ui/Card/CardStats";
import { ListCard } from "src/components/ui/Card/ListCard";
import { useAppSelector } from "src/services/hooks/useStore";
import { variants } from "src/services/variants/sidebarVariants";

export const BlockHomeCurrency = ({ isLoading }: { isLoading: boolean }) => {
  const state = useAppSelector((state) => state.home);
  if (
    !state.binance ||
    !state.blackMarket ||
    !state.foreignCurrencies ||
    !state.cib ||
    !state.creditRating ||
    !state.gold
  )
    return;

  return (
    <motion.div
      className="grid w-full grid-cols-8 space-y-0 gap-y-7 h-fit gap-x-1 xl:gap-x-4  "
      {...variants}
    >
      <CardIndicator />
      <CardStats loading={isLoading} name="Binance" platform={state.binance} />

      <CardStats
        loading={isLoading}
        name="Black Market"
        platform={state.blackMarket}
      />
      <CardSmall
        loading={isLoading}
        name="Gold Dollar"
        price={state.gold?.Dollar.Price}
        rate={state.gold.Dollar.Rate}
      />

      <div className="flex flex-col md:flex-row col-span-8 lg:col-span-4 gap-2">
        <ListCard
          list={state.foreignCurrencies?.OfficialExchangeRate}
          name="Foreign Currency"
          subtitle="Official Rate"
          type="currency"
        />
        <ListCard
          list={state.foreignCurrencies?.BlackMarket}
          name="Foreign Currency"
          subtitle="Black Market"
          type="currency"
        />
      </div>
      <div className="flex flex-col col-span-8 lg:col-span-4 gap-y-2">
        <CardDetails
          content={state.cib}
          loading={isLoading}
          name="CIB Arbit"
          type="CIB"
        />
        <CardDetails
          content={state.creditRating}
          loading={isLoading}
          name="Credit Rating"
          type="CreditRating"
        />
      </div>
    </motion.div>
  );
};
