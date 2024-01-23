import { useAnimatedCounter } from "../../../services/hooks/useAnimateNumbers";
import { AnimatePresence, motion } from "framer-motion";
import { toFixedIfNecessary } from "src/services/helpers";
import { IconsBinance } from "../icons/IconsBinance";
import { IconsBlackMarket } from "../icons/IconsBlackMarket";
import { useEffect, useState } from "react";
import { BinanceAndBlackMarket } from "src/services/types";

const variants = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: { type: "spring", damping: 5 },
};

interface Props {
  name: string;
  platform: BinanceAndBlackMarket;
  loading: boolean;
}

export const Card = ({
  loading = true,

  platform,
  name,
}: Props) => {
  const { Trading, Rate } = platform;
  const [prev, setPrev] = useState(Trading);
  const counterBuy = useAnimatedCounter(Trading.Buy, prev.Buy, 30, loading);
  const counterSell = useAnimatedCounter(Trading.Sell, prev.Sell, 30, loading);

  useEffect(() => {
    setPrev(platform.Trading);
  }, [platform]);
  const Icon = name === "Binance" ? <IconsBinance /> : <IconsBlackMarket />;

  return (
    <article className="relative flex flex-col justify-between w-full col-span-1 px-4 py-4 overflow-hidden text-black bg-white shadow-lg h-fit min-h-40 grid-col dark:text-white dark:bg-dark-container rounded-xl">
      <div className="z-20 flex items-center justify-between w-full">
        <h1 className="flex items-center text-2xl font-semibold text-black gap-x-2 dark:text-dark-titles">
          {name}
        </h1>
        {Icon}
      </div>
      {loading ? (
        <Card.Skeleton />
      ) : (
        <div className="flex flex-col mt-3 gap-y-3">
          <Card.Content buy counter={counterBuy} rate={Rate.BuyChangeRate} />
          <Card.Content counter={counterSell} rate={Rate.SellChangeRate} />
        </div>
      )}
    </article>
  );
};

const CardContent = ({
  counter,
  rate,
  buy = false,
}: {
  counter: number | string;
  rate: number;
  buy?: boolean;
}) => (
  <div className="flex items-end justify-between min-h-min">
    <motion.span
      {...variants}
      className="flex items-end text-4xl font-semibold gap-x-2"
    >
      E£ {counter}
      <span className="text-sm italic text-gray-400">
        ({buy ? "buy" : "sell"})
      </span>
    </motion.span>
    <div className="flex flex-col justify-between font-semibold">
      <span className={`${rate >= 0 ? "text-success" : "text-danger"}`}>
        {rate >= 0 ? "+" : ""}
        {toFixedIfNecessary(`${rate}`, 2)}%
      </span>
    </div>
  </div>
);

const Skeleton = () => (
  <>
    <motion.span
      {...variants}
      className="w-1/2 h-8 p-4 text-5xl bg-gray-200 rounded-lg animate-pulse"
    />
    <AnimatePresence>
      <motion.div {...variants} className="flex justify-between h-fit">
        <span className="w-1/3 h-5 bg-gray-200 rounded-lg animate-pulse" />
        <span className="w-1/4 h-5 bg-gray-200 rounded-lg animate-pulse" />
      </motion.div>
    </AnimatePresence>
  </>
);

Card.Skeleton = Skeleton;
Card.Content = CardContent;
