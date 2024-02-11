import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BaseInput } from "src/components/ui/Input/BaseInput";
import { CountryPicker } from "src/components/ui/Input/CountryPicker";
import {
  Country,
  countryFlags,
  countryHeaders,
} from "src/services/providers/countries";

import { toFixedWithCommas } from "src/services/helpers";
import { ButtonSwap } from "src/components/ui/button/ButtonSwap";

interface Props {
  list: { [key: string]: number } | undefined;
  loading: boolean;
}

type StateType = {
  from: number;
  to: number;
};

interface PickerEmit {
  value: Country;
  name: string;
}
export const BlockConversion = ({ loading, list }: Props) => {
  if (loading || !list) return;
  const [currencies, setCurrencies] = useState({
    currencyFrom: list ? list.USD : 1,
    currencyTo: 1,
  });

  const [toggles, setToggles] = useState({
    toggleFrom: false,
    toggleTo: false,
  });

  const [countryPicker, setCountryPicker] = useState({
    currencyFrom: "US",
    currencyTo: "EG",
  });

  const [inputs, setInputs] = useState<StateType>({
    to: 1,
    from: 1,
  });

  const handleChange = (
    setState: Dispatch<SetStateAction<StateType>>,
    event: HTMLInputElement | HTMLTextAreaElement
  ) => {
    const { name, value } = event;
    setState((prevFormData: StateType) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const currencyValues = (e: PickerEmit) => {
    setCountryPicker((countries) => ({
      ...countries,
      [e.name]: e.value.code,
    }));

    if (list) {
      setCurrencies((currencies) => ({
        ...currencies,
        [e.name]: list[e.value.currencyCode as keyof typeof list],
      }));
    }
    console.log(currencies);
  };

  const convertValues = (inputFrom: number) => {
    const { currencyFrom, currencyTo } = countryPicker;

    const from = currencyFrom === "EG" ? 1 : currencies.currencyFrom;
    const to = currencyTo === "EG" ? 1 : currencies.currencyTo;

    let conversion;
    if (to) {
      if (currencyFrom === "EG") {
        conversion = inputFrom / to;
      } else {
        conversion = (inputFrom * from) / to;
      }
    }
    return conversion;
  };

  // const [conv, setConv] = useState<number | string | undefined>(list?.USD);

  const swapCurrencies = () => {
    const tempCode = {
      currencyFrom: countryPicker.currencyFrom,
      currencyTo: countryPicker.currencyTo,
    };
    const tempCurrency = {
      currencyFrom: currencies.currencyFrom,
      currencyTo: currencies.currencyFrom,
    };
    const tempInput = { to: inputs.to, from: inputs.from };

    setCountryPicker((countryPicker) => ({
      ...countryPicker,
      currencyFrom: tempCode.currencyTo,
      currencyTo: tempCode.currencyFrom,
    }));
    setCurrencies((currencies) => ({
      ...currencies,
      currencyFrom: tempCurrency.currencyTo,
      currencyTo: tempCurrency.currencyFrom,
    }));

    setInputs((inputs) => ({
      ...inputs,
      from: tempInput.to,
      to: tempInput.from,
    }));
  };

  useEffect(() => {
    const countryFrom = countryFlags.filter(
      (el) => el.code == countryPicker.currencyFrom
    );
    const countryTo = countryFlags.filter(
      (el) => el.code == countryPicker.currencyTo
    );
    if (!list) {
      return;
    }
    if (countryFrom[0].code !== "EG") {
      setCurrencies({
        currencyFrom: list
          ? list[countryFrom[0].currencyCode as keyof typeof list]
          : 1,
        currencyTo: list
          ? list[countryTo[0].currencyCode as keyof typeof list]
          : list["USD"],
      });
    }
    if (countryFrom[0].code === "EG") {
      setCurrencies({
        currencyFrom: 1,
        currencyTo: list[countryTo[0].currencyCode as keyof typeof list],
      });
    }
    // setConv(toFixedWithCommas(`${convertValues(inputs.from)}`, 2));
  }, [list, inputs]);

  return (
    <div className="flex flex-col justify-center w-full p-4 mx-auto my-auto rounded-md sm:bg-light-container sm:dark:bg-dark-bg dark:text-white sm:dark:shadow-xl h-fit sm:min-w-32 sm:w-80 sm:shadow-md">
      <div className="flex flex-col items-center justify-center mx-auto gap-y-4 h-fit gap-x-3">
        <div className="flex flex-col gap-y-2">
          <h2>Amount</h2>
          <div className="flex flex-col self-center flex-1 sm:flex-row max-w-1/3 h-fit min-h-max gap-x-2 gap-y-4">
            <CountryPicker
              id="selector"
              name="currencyFrom"
              onChange={(e) => {
                currencyValues(e);
              }}
              onToggle={() =>
                setToggles({ ...toggles, toggleFrom: !toggles.toggleFrom })
              }
              open={toggles.toggleFrom}
              selectedValue={countryHeaders.find(
                (el) => el.code == countryPicker.currencyFrom
              )}
            />
            <BaseInput
              className="w-1/2"
              id="first"
              name="from"
              placeholder="Enter value..."
              type="number"
              value={inputs.from}
              valueGetter={(e) => handleChange(setInputs, e)}
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <div className="bg-gray-200 h-[0.5px] flex flex-1 w-1/2" />
          <button
            className="p-2 bg-white rounded-full shadow-md dark:bg-dark-container w-fit h-fit"
            onClick={swapCurrencies}
            type="button"
          >
            <ButtonSwap />
          </button>
          <div className="flex w-1/2 bg-gray-200 h-[0.5px]  flex-1" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2>Converted Amount</h2>
          <div className="flex flex-col self-center flex-1 w-full sm:flex-row min-h-max gap-x-2 gap-y-4">
            <CountryPicker
              id="selector"
              name="currencyTo"
              onChange={(e) => currencyValues(e)}
              onToggle={() =>
                setToggles({ ...toggles, toggleTo: !toggles.toggleTo })
              }
              open={toggles.toggleTo}
              selectedValue={countryHeaders.find(
                (option) => option.code === countryPicker.currencyTo
              )}
            />
            <BaseInput
              className="w-1/2"
              disabled
              id="second"
              name="to"
              type="string"
              value={toFixedWithCommas(`${convertValues(inputs.from)}`, 2)}
              valueGetter={(e) => handleChange(setInputs, e)}
            />
          </div>
        </div>
      </div>
      <span className="mt-6">
        Change rate: {1} ≈ {toFixedWithCommas(`${convertValues(1)}`, 2)}
      </span>
    </div>
  );
};
