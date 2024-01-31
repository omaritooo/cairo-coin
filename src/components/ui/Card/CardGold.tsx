import { useAnimatedCounter } from "../../../services/hooks/useAnimateNumbers";
import { motion } from "framer-motion";
import { toFixedWithCommas } from "src/services/helpers";

import { useEffect, useState } from "react";

import { Card } from "./Card";
import IconsGold from "../icons/IconsGold";

const variants = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  transition: { type: "spring", damping: 5 },
};

type Karats = { [key: string]: number };

interface Props {
  name: string;
  karats: Karats;
  loading: boolean;
  rate: boolean;
  type: "sm" | "lg";
}

export const CardGold = ({
  loading = true,
  karats,
  rate = false,
  type,
  name,
}: Props) => {
  const [prev, setPrev] = useState(karats);

  const Icon = <IconsGold />;

  useEffect(() => {
    setPrev(karats);
  }, [karats]);

  if (type == "sm") {
    const counterBuy = useAnimatedCounter(karats.K24, prev.K24, 30, loading);

    return (
      <Card icon={Icon} loading={loading} name={name}>
        <div className="flex flex-col mt-3 gap-y-1">
          {Object.keys(karats).map((el) => (
            <CardGold.Content carat={el} counter={counterBuy} key="el" />
          ))}
        </div>
      </Card>
    );
  } else if (type == "lg" && rate) {
    return (
      <Card icon={Icon} loading={loading} name={name}>
        <div className="flex flex-col mt-3 gap-y-1">
          {Object.keys(karats).map((el) => {
            const counter = useAnimatedCounter(
              karats[el as keyof typeof karats],
              prev[el as keyof typeof prev],
              30,
              loading
            );
            return (
              <CardGold.Content carat={`${el}`} counter={counter} key={el} />
            );
          })}
        </div>
      </Card>
    );
  } else {
    return (
      <Card icon={Icon} loading={loading} name={name}>
        <div className="flex flex-col mt-3 gap-y-1">
          {Object.keys(karats).map((el) => {
            const counter = useAnimatedCounter(
              karats[el as keyof typeof karats],
              prev[el as keyof typeof prev],
              30,
              loading
            );
            return <CardGold.Content carat={el} counter={counter} key={el} />;
          })}
        </div>
      </Card>
    );
  }
};

const CardContent = ({
  counter,
  carat,
}: {
  counter: number | string;
  carat: string;
}) => (
  <div className="flex items-end justify-between min-h-min">
    <motion.span
      {...variants}
      className="flex items-baseline text-3xl lg:text-xl xl:text-3xl font-semibold gap-x-2"
    >
      {toFixedWithCommas(`${counter}`, 2)}
      <span className="text-sm italic font-light text-gray-400">
        {`${carat}` === "K24" ? "24 Carat" : "21 Carat"}
      </span>
    </motion.span>
  </div>
);

CardGold.Content = CardContent;
