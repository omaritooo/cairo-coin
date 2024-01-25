import { motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";

import { useEffect, useState } from "react";
import { useAnimatedCounter } from "src/services/hooks/useAnimateNumbers";
import { toFixedWithCommas } from "src/services/helpers";
import { Card } from "./Card";
import IconsGold from "../icons/IconsGold";

interface Props {
  name: string;
  loading: boolean;
  price: number;
  rate: number;
}
export const CardSmall = ({ name, loading, price, rate }: Props) => {
  const [prev, setPrev] = useState(price);
  const counter = useAnimatedCounter(price, prev, 30, loading);

  useEffect(() => {
    setPrev(price);
  }, [price]);
  return (
    <Card icon={<IconsGold />} loading={loading} name={name}>
      <div className="flex items-end justify-between min-h-min">
        <motion.span
          {...variants}
          className="flex items-end text-4xl lg:text-xl xl:text-4xl font-semibold gap-x-2"
        >
          E£ {counter}
        </motion.span>
        <div className="flex flex-col justify-between font-semibold">
          <span className={`${rate >= 0 ? "text-success" : "text-danger"}`}>
            {rate >= 0 ? "+" : ""}
            {toFixedWithCommas(`${rate}`, 2)}%
          </span>
        </div>
      </div>
    </Card>
  );
};
