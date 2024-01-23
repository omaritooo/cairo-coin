import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BaseInput } from "src/components/ui/Input/BaseInput";
import { BaseSelector } from "src/components/ui/Input/BaseSelector";
import { ButtonSwap } from "src/components/ui/button/ButtonSwap";
import { Country, countryHeaders } from "src/services/providers/countries";
import { useAppSelector } from "src/services/hooks/useStore";
import { toFixedIfNecessary } from "src/services/helpers";

interface Props {
  platform: string;
  transaction: string;
  list: { [key: string]: number } | undefined;
}

type StateType = {
  from: number;
  to: number;
};

interface PickerEmit {
  value: Country;
  name: string;
}
export const BlockConversion = ({ platform, transaction, list }: Props) => {
  console.log(list);
  const binance = useAppSelector((state) => state.calculator.binance);
  const blackMarket = useAppSelector((state) => state.calculator.blackMarket);

  const [currencies, setCurrencies] = useState({
    currencyFrom: 1,
    currencyTo: binance ? binance["Buy"]["USD"] : 1,
  });

  const [toggles, setToggles] = useState({
    toggleFrom: false,
    toggleTo: false,
  });

  const [countryPicker, setCountryPicker] = useState({
    currencyFrom: "EG",
    currencyTo: "US",
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
    const list2 = platform === "Black Market" ? blackMarket : binance;

    if (list2) {
      setCurrencies((currencies) => ({
        ...currencies,
        [e.name]:
          list2[`${transaction}` as keyof typeof list2][
            `${e.value.currencyCode}` as keyof typeof list2
          ],
      }));
    }
  };

  const swapCurrencies = () => {
    const tempCode = countryPicker.currencyFrom;
    const tempCurrency = currencies.currencyFrom;
    const tempInput = inputs.to;
    console.log("Temp input: ", tempInput);
    setCountryPicker((el) => ({
      currencyFrom: el.currencyTo,
      currencyTo: tempCode,
    }));
    setCurrencies((el) => ({
      currencyFrom: el.currencyTo,
      currencyTo: tempCurrency,
    }));

    setInputs((el) => ({
      from: tempInput,
      to: el.from,
    }));
  };

  const convertValues = useCallback(
    (inputFrom: number) => {
      const { currencyFrom, currencyTo } = countryPicker;
      const from = currencyFrom === "EG" ? 1 : currencies.currencyFrom;
      const to = currencyTo === "EG" ? 1 : currencies.currencyTo;

      let conversion;
      if (currencyFrom === "EG") {
        conversion = inputFrom * to;
      } else {
        conversion = (inputFrom * from) / to;
      }
      return conversion;
    },
    [currencies, platform, transaction, countryPicker]
  );

  const convertedCurrency = useMemo(
    () => toFixedIfNecessary(`${convertValues(inputs.from)}`, 2),
    [inputs, currencies, platform, transaction]
  );

  const changeRates = useMemo(
    () => toFixedIfNecessary(`${convertValues(1)}`, 2),
    [currencies, platform, transaction, countryPicker]
  );

  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="flex items-center justify-center w-1/2 mx-auto h-fit gap-x-3">
        <div className="flex self-center flex-1 max-w-1/3 h-fit min-h-max gap-x-2 gap-y-4">
          <BaseSelector
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
            type="text"
            value={inputs.from}
            valueGetter={(e) => handleChange(setInputs, e)}
          />
        </div>

        <button
          className="bg-transparent w-fit h-fit"
          onClick={swapCurrencies}
          type="button"
        >
          <ButtonSwap />
        </button>

        <div className="flex self-center flex-1 min-h-max gap-x-2 gap-y-4">
          <BaseSelector
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
            type="number"
            value={convertedCurrency}
            valueGetter={(e) => handleChange(setInputs, e)}
          />
        </div>
      </div>
      <span>
        Change rate: {1} ≈ {changeRates}
      </span>
    </div>
  );
};
