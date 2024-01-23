import { motion, AnimatePresence } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";

import { IconsBank } from "../icons/IconsBank";
import { useEffect, useState } from "react";
import { useAnimatedCounter } from "src/services/hooks/useAnimateNumbers";
import { toFixedIfNecessary } from "src/services/helpers";

interface Props {
  name: string;
  loading: boolean;
  price: number;
  rate: number;
}
export const CardSmall = ({ name, loading, price, rate }: Props) => {
  console.log("Mounted");

  const [prev, setPrev] = useState(price);
  const counter = useAnimatedCounter(price, prev, 30, loading);

  useEffect(() => {
    setPrev(price);
  }, [price]);
  return (
    <article className="relative flex flex-col justify-between w-full col-span-1 px-4 py-4 overflow-hidden text-black bg-white shadow-lg min-h-40 grid-col dark:text-white dark:bg-dark-container rounded-xl">
      <div className="z-20 flex items-center justify-between w-full">
        <h1 className="flex items-center text-2xl font-semibold text-black gap-x-2 dark:text-dark-titles">
          {name}
        </h1>
        <IconsBank />
      </div>
      {loading ? (
        <CardSmall.Skeleton />
      ) : (
        <div className="flex flex-col mt-3 gap-y-3">
          <div className="flex items-end justify-between min-h-min">
            <motion.span
              {...variants}
              className="flex items-end text-4xl font-semibold gap-x-2"
            >
              E£ {counter}
            </motion.span>
            <div className="flex flex-col justify-between font-semibold">
              <span className={`${rate >= 0 ? "text-success" : "text-danger"}`}>
                {rate >= 0 ? "+" : ""}
                {toFixedIfNecessary(`${rate}`, 2)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

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

CardSmall.Skeleton = Skeleton;
