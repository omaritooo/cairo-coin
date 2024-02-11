import { AnimatePresence, motion } from "framer-motion";
import { MutableRefObject, useEffect, useRef } from "react";
import { Country, countryHeaders } from "src/services/providers/countries";
import React from 'react'
export interface BaseSelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  name: string;
  onToggle: () => void;
  onChange: (value: PickerEmit) => void;
  selectedValue: Country | undefined;
}

interface PickerEmit {
  value: Country;
  name: string;
}

export const CountryPicker = ({
  id,
  open,
  name,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
}: BaseSelectorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target as Node) &&
        open
      ) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      <div className="relative w-full h-full">
        <button
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-labelledby="listbox-label"
          className={`${
            disabled ? "bg-neutral-100" : "bg-white dark:bg-dark-input"
          } relative w-full border border-gray-300 min-h-full dark:border-none dark:text-white rounded-md shadow-sm pl-3 pr-2 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          disabled={disabled}
          onClick={onToggle}
          type="button"
        >
          {selectedValue ? (
            <span className="flex items-center w-24 truncate ">
              <img
                alt={`${selectedValue.code}`}
                className="inline h-4 rounded-sm rtl:ml-2 ltr:mr-2"
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.code}.svg`}
              />
              {selectedValue.currencyCode}
            </span>
          ) : null}
          <span
            className={`absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center pr-2 pointer-events-none ${
              disabled ? "hidden" : ""
            }`}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <AnimatePresence>
          {open ? (
            <motion.ul
              animate={{ opacity: 1 }}
              aria-activedescendant="listbox-option-3"
              aria-labelledby="listbox-label"
              className="absolute z-10 w-full mt-1 text-base bg-white rounded-md shadow-lg dark:text-white dark:bg-dark-input max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              role="listbox"
              tabIndex={-1}
              transition={{ duration: 0.1 }}
            >
              <div className="overflow-y-scroll max-h-36 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin">
                {countryHeaders.map((value, index) => (
                  <li
                    className="relative flex items-center py-2 pl-3 text-gray-900 transition cursor-default select-none rtl:pl-9 ltr:pr-9 hover:bg-dark-titles"
                    id="listbox-option-0"
                    key={`${id}-${index}`}
                    onClick={() => {
                      onChange({ value, name });
                      onToggle();
                    }}
                    role="option"
                  >
                    <img
                      alt={`${value.code}`}
                      className="inline h-4 rounded-sm rtl:ml-2 ltr:mr-2"
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.code}.svg`}
                    />

                    <span className="font-normal text-black truncate dark:text-white">
                      {value.currencyCode}
                    </span>
                    {value.code === selectedValue?.code ? (
                      <span className="absolute inset-y-0 flex items-center text-blue-600 rtl:left-0 ltr:right-0 ltr:pr-2 rtl:pl-2">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            fillRule="evenodd"
                          />
                        </svg>
                      </span>
                    ) : null}
                  </li>
                ))}
              </div>
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
