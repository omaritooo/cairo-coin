import { useAppSelector } from "src/services/hooks/useStore";
import IconsIndicator from "../icons/IconsIndicator";
import { Card } from "./Card";

import { createPortal } from "react-dom";
import { Modal } from "src/components/shared/Modal";
import { useEffect, useState } from "react";
import { indicatorColor } from "src/services/helpers";
import { IconsInfinity } from "../icons/IconsInfinity";

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
        color="bg-dark-container  dark:bg-dark-input text-white dark:text-white "
        icon={<IconsIndicator />}
        loading={false}
        name="Indicator"
      >
        {indicator.Value == "Infinity" ? (
          <CardInfinity />
        ) : (
          <>
            <span className="text-center w-fit mx-auto text-6xl text-white ">
              {indicator?.Value}
              {/* <IconsInfinity /> */}
            </span>
            <div
              className={`flex gap-x-1 ${
                (indicator.Value as number) < 0 ? "flex-row-reverse" : ""
              } `}
            >
              {[...Array(Math.abs(indicator.Value as number))].map(
                (el, idx) => (
                  <Pill Value={idx + 1} active key={el} />
                )
              )}
              {[...Array(10 - Math.abs(indicator.Value as number))].map(
                (el, idx) => (
                  <Pill Value={idx + 1} key={el} />
                )
              )}
            </div>
          </>
        )}
        <button
          className="text-xs  rounded-full bg-dark-titles dark:bg-white text-black w-5 h-5 text-center flex items-center justify-center absolute bottom-8 left-4"
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
  const indicatorStyle = indicatorColor(Value);

  return (
    <div
      className={`w-[9%] h-1 rounded-md ${
        active
          ? indicatorStyle
          : "bg-gray-400 bg-opacity-60 animate-pulse duration-1000"
      }`}
    />
  );
};

const CardInfinity = () => (
  <>
    <span className="text-center mx-auto w-16 h-16">
      <IconsInfinity />
    </span>
    <div className={`flex gap-x-1  `}>
      {[...Array(10)].map((el) => (
        <Pill Value={10} active key={el} />
      ))}
    </div>
  </>
);
