import { useAppSelector } from "src/services/hooks/useStore";
import IconsIndicator from "../icons/IconsIndicator";
import { Card } from "./Card";

import { createPortal } from "react-dom";
import { Modal } from "src/components/shared/Modal";
import { useEffect, useState } from "react";

export const CardIndicator = () => {
  const indicator = useAppSelector((state) => state.home.indicator);
  const [open, setOpened] = useState(false);
  if (!indicator) return;
  const main = document.getElementById("main");

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <>
      <Card
        color="bg-dark-container dark:bg-light-titles text-white dark:text-black "
        icon={<IconsIndicator />}
        loading={false}
        name="Indicator"
      >
        <span className="text-center w-fit mx-auto text-6xl">
          {indicator?.Value}
        </span>
        <div className={`flex gap-x-1 `}>
          {[...Array(indicator?.Value)].map((el, idx) => (
            <Pill Value={idx + 1} active key={el} />
          ))}
          {[...Array(10 - indicator?.Value)].map((el, idx) => (
            <Pill Value={idx + 1} key={el} />
          ))}
        </div>
        <button
          className="text-xs  rounded-full bg-dark-titles dark:bg-white w-5 h-5 text-center flex items-center justify-center absolute bottom-8 left-4"
          onClick={() => setOpened(true)}
          type="button"
        >
          ?
        </button>
      </Card>
      {createPortal(
        <Modal
          onRequestClose={() => {
            setOpened(false);
          }}
          shouldShow={open}
        >
          The CaiorCoin indicator reflects fluctuations in the Egyptian Pound,
          ranging from -10 to 10, based on a set of indicators. Each indicator
          carries a weighted value. A negative value indicates an increase in
          the strength of the Egyptian Pound. As the negative value approaches
          -10, the pound&apos;s strength intensifies. Conversely, a positive
          value implies a decrease in the pound&apos;s strength. As it
          approaches 10, its strength weakens, and its value depreciates
          further.
        </Modal>,
        main as Element
      )}
    </>
  );
};

const Pill = ({
  Value,
  active = false,
}: {
  Value: number;
  active?: boolean;
}) => {
  const indicatorColor = () => {
    const abs = Math.abs(Value);
    switch (true) {
      case abs <= 1:
        return "bg-indicator-1";
        break;
      case abs >= 2 && Value < 4:
        return "bg-indicator-2";

        break;
      case abs >= 4 && abs <= 7:
        return "bg-indicator-3";

        break;
      case abs >= 7 && abs < 9:
        return "bg-indicator-4";
        break;
      case abs >= 9 && abs <= 10:
        return "bg-indicator-5";
        break;
      default:
        return "bg-black";
    }
  };
  console.log(Value);
  return (
    <div
      className={`w-[9%] h-1 rounded-md ${
        active
          ? indicatorColor()
          : "bg-gray-400 bg-opacity-60 animate-pulse duration-1000"
      }`}
    />
  );
};
