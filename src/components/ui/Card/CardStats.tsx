import { useAnimatedCounter } from "../../../services/hooks/useAnimateNumbers";
import { motion } from "framer-motion";
import { toFixedWithCommas } from "src/services/helpers";
import IconsBinance from "../icons/IconsBinance";
import IconsBlackMarket from "../icons/IconsBlackMarket";
import { useEffect, useState } from "react";
import { BinanceAndBlackMarket } from "src/services/types";
import { Card } from "./Card";

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

export const CardStats = ({
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
    <Card icon={Icon} loading={loading} name={name}>
      <div className="flex flex-col mt-3 gap-y-1">
        <CardStats.Content buy counter={counterBuy} rate={Rate.BuyChangeRate} />
        <CardStats.Content counter={counterSell} rate={Rate.SellChangeRate} />
      </div>
    </Card>
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
      className="flex items-end text-3xl lg:text-xl xl:text-3xl font-semibold gap-x-2"
    >
      E£ {counter}
      <span className="text-sm italic text-gray-400">
        ({buy ? "buy" : "sell"})
      </span>
    </motion.span>
    <div className="flex flex-col justify-between font-semibold">
      <span className={`${rate >= 0 ? "text-success" : "text-danger"}`}>
        {rate >= 0 ? "+" : ""}
        {toFixedWithCommas(`${rate}`, 2)}%
      </span>
    </div>
  </div>
);

CardStats.Content = CardContent;
