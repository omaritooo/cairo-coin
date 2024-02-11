import { motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";
import { CardSmall } from "src/components/ui/Card/CardSmall";
import { useAppSelector } from "src/services/hooks/useStore";
import { CardIndicator } from "src/components/ui/Card/CardIndicator";
import { ListCard } from "src/components/ui/Card/ListCard";
import { CardGold } from "src/components/ui/Card/CardGold";

export const BlockGold = ({ isLoading }: { isLoading: boolean }) => {
  const state = useAppSelector((state) => state.home);
  if (!state.gold) return;
  return (
    <motion.div
      className="grid w-full grid-cols-8 space-y-0 gap-y-7 h-fit gap-x-4 "
      {...variants}
    >
      <CardIndicator />
      <CardSmall
        loading={isLoading}
        name="Gold Dollar"
        price={state.gold?.Dollar.Price}
        rate={state.gold.Dollar.Rate}
      />
      <CardGold
        karats={state.gold.Gram.Buy}
        loading={isLoading}
        name="Buy"
        rate
        type="lg"
      />
      <CardGold
        karats={state.gold.Gram.Sell}
        loading={isLoading}
        name="Sell"
        rate
        type="lg"
      />

      <div className="flex flex-col col-span-8 gap-2 md:flex-row lg:col-span-4">
        <ListCard
          list={state.gold.Ingot.Buy}
          name="Gold Ingots"
          subtitle="Buy"
          type="gold"
        />
        <ListCard
          list={state.gold.Ingot.Sell}
          name="Gold Ingots"
          subtitle="Sell"
          type="gold"
        />
      </div>
      <div className="flex flex-col col-span-8 gap-2 md:flex-row lg:col-span-4">
        <CardGold
          karats={state.gold.Gram.Rate}
          loading={isLoading}
          name="Change Rate"
          rate
          type="sm"
        />
        <CardGold
          karats={state.gold.Gram.GlobalPrice}
          loading={isLoading}
          name="Global Price"
          rate
          type="sm"
        />
      </div>
    </motion.div>
  );
};
