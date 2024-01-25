import { CIB, CreditRating } from "src/services/types";
import { Card } from "./Card";
import { motion } from "framer-motion";
import { toFixedWithCommas } from "src/services/helpers";
import { variants } from "src/services/variants/sidebarVariants";
import { useState, useEffect } from "react";
import { useAnimatedCounter } from "src/services/hooks/useAnimateNumbers";

type CommonProps = {
  loading: boolean;
  name: string;
};

type Props =
  | (CommonProps & { content: CIB; type: "CIB" })
  | (CommonProps & { content: CreditRating; type: "CreditRating" });
export const CardDetails = ({ name, loading, content, type }: Props) => {
  console.log("CardDetails");

  return (
    <Card loading={loading} name={name} size="h-fit lg:h-1/2">
      {type === "CIB" ? (
        <CardCIB content={content} loading={loading} />
      ) : (
        <CardCredit content={content} />
      )}
    </Card>
  );
};

const CardCIB = ({ content, loading }: { content: CIB; loading: boolean }) => {
  const { Data, Details } = content;
  const [prev, setPrev] = useState(Data.DollarPrice);
  const counter = useAnimatedCounter(Data.DollarPrice, prev, 30, loading);

  useEffect(() => {
    setPrev(content.Data.DollarPrice);
  }, [content]);
  return (
    <div className="h-full mt-1 flex flex-col justify-between">
      <p className="flex items-end text-sm font-light italic gap-x-2 lg:max-w-[75%]">
        CIB Arbitrage involves buying convertible bonds and short selling the
        underlying stock to profit from pricing discrepancies.
      </p>
      <div className="flex items-end justify-between mt-2 min-h-min">
        <motion.span
          {...variants}
          className="flex items-end text-4xl font-semibold gap-x-2"
        >
          E£ {counter}
        </motion.span>
        <div className="flex flex-col justify-between font-semibold">
          <span
            className={`${Data.Rate >= 0 ? "text-success" : "text-danger"}`}
          >
            {Data.Rate >= 0 ? "+" : ""}
            {toFixedWithCommas(`${Data.Rate}`, 2)}%
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-auto">
        <h2 className="flex items-center text-2xl mb-1 font-semibold text-black gap-x-2 dark:text-dark-titles">
          Details
        </h2>
        <div className="flex justify-between lg:justify-start lg:gap-x-16 ">
          <div className="flex flex-col gap-y-2 text-lg">
            <span>
              <img
                className="inline h-4 rounded-sm rtl:ml-2 ltr:mr-2"
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/EG.svg"
              />
              Egypt: <span>{Details.Market.Egypt}</span>
            </span>
            <span>
              <img
                className="inline h-4 rounded-sm rtl:ml-2 ltr:mr-2"
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
              />
              London: <span>{Details.Market.London}</span>
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-lg font-semibold">
              CBKD:
              <span className="text-lg font-light italic">
                {Details.Stocks.CBKD}
              </span>
            </span>
            <span className="text-lg font-semibold">
              COMI:
              <span className="text-lg font-light italic">
                {Details.Stocks.COMI}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardCredit = ({ content }: { content: CreditRating }) => (
  <div className="flex flex-col mt-4 gap-y-3  h-full flex-1">
    <motion.span
      {...variants}
      className="flex items-end text-sm font-light italic gap-x-2"
    >
      Moody&apos;s and Standard & Poor&apos;s (S&P) are major credit rating
      agencies, evaluating the creditworthiness of entities globally. They
      assign ratings to help investors assess risk.
    </motion.span>
    <div className="flex justify-between lg:justify-start lg:gap-x-20 ">
      {Object.keys(content).map((el) => (
        <div className="flex flex-col gap-y-2" key={el}>
          <h1 className="text-xl font-semibold">
            {el === "SP" ? "S&P" : "Moody's"}
          </h1>
          <span className="flex gap-x-1">
            <strong>Rating:</strong>
            {content[el as keyof typeof content].Rating}
          </span>
          <span className="gap-x-1 flex">
            <strong>Outlook:</strong>
            {content[el as keyof typeof content].Outlook}
          </span>
          <span className="flex gap-x-1">
            <strong>Date:</strong> {content[el as keyof typeof content].Date}
          </span>
        </div>
      ))}
    </div>
  </div>
);
