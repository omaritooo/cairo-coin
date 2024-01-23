import { useEffect, useState } from "react";
import { animate } from "framer-motion";

function roundWithPrecision(num: number, precision: number) {
  const multiplier = Math.pow(10, precision);
  return Math.round(num * multiplier) / multiplier;
}
export const useAnimatedCounter = (
  maxValue: number,
  initialValue = 0,
  duration = 1,
  loadingState = false
) => {
  const [counter, setCounter] = useState<number | string>(initialValue);

  useEffect(() => {
    if (!loadingState) {
      const controls = animate(initialValue, maxValue, {
        type: "spring",
        restSpeed: 1,
        delay: 0.5,
        ease: "easeInOut",
        duration,
        onUpdate(value) {
          setCounter(roundWithPrecision(value, 2));
        },
      });
      return () => controls.stop();
    }
  }, [initialValue, maxValue, duration, loadingState]);

  return counter;
};
