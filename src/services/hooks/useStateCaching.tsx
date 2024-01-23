import { useState, useRef, useEffect } from "react";

export const useStateCaching = (initialValue: number) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const previousValueRef = useRef(initialValue);

  useEffect(() => {
    previousValueRef.current = currentValue;
  }, [currentValue]);

  return [currentValue, previousValueRef.current, setCurrentValue];
};
