import { motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";
import { CardSmall } from "src/components/ui/Card/CardSmall";
import { useAppSelector } from "src/services/hooks/useStore";
import { CardIndicator } from "src/components/ui/Card/CardIndicator";
import { ListCard } from "src/components/ui/Card/ListCard";

export const BlockGold = ({ isLoading }: { isLoading: boolean }) => {
  console.log("Gold block.");
  const state = useAppSelector((state) => state.home);
  if (!state.gold) return;
  return (
    <motion.div
      className="grid w-full grid-cols-8 space-y-0 gap-y-7 h-fit gap-x-4  "
      {...variants}
    >
      <CardIndicator />

      <CardSmall
        loading={isLoading}
        name="Gold Dollar"
        price={state.gold?.Dollar.Price}
        rate={state.gold.Dollar.Rate}
      />
      <CardSmall
        loading={isLoading}
        name="Gold Dollar"
        price={state.gold?.Dollar.Price}
        rate={state.gold.Dollar.Rate}
      />
      <CardSmall
        loading={isLoading}
        name="Gold Dollar"
        price={state.gold?.Dollar.Price}
        rate={state.gold.Dollar.Rate}
      />
      <div className="flex flex-col md:flex-row col-span-8 lg:col-span-4 gap-2">
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
    </motion.div>
  );
};
