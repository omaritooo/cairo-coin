// import { useTranslation } from "react-i18next";

interface IProps {
  label?: string;
  placeholder?: string;
  valueGetter: (e: HTMLInputElement | HTMLTextAreaElement) => void;
  type: string;
  id: string;
  value: string | number;
  name: string;
  disabled?: boolean;
  className?: string;
}

export const BaseInput = ({
  label,
  placeholder,
  valueGetter,
  value,
  id,
  disabled = false,
  type = "text",
  name,
  className,
}: IProps) => {
  // const { t } = useTranslation();

  const inputEmitter = (e: HTMLInputElement | HTMLTextAreaElement) => {
    valueGetter(e);
  };

  const Component = (
    <input
      className="w-full h-12 px-4 text-black bg-gray-100 rounded-md shadow-sm min-h-20 dark:text-white dark:shadow-none dark:bg-dark-input focus:outline-none"
      disabled={disabled}
      id={id}
      name={name}
      onChange={(event) => inputEmitter(event.target)}
      pattern="^\d+(?:\.\d{1,2})?$"
      placeholder={placeholder}
      step="0.01"
      type={type}
      value={value ? value : " "}
    />
  );

  const Label = label ? <label htmlFor={id}> {label}</label> : null;

  return (
    <div className={`flex flex-col gap-y-3 w-full ${className} min-h-max`}>
      {Label}
      {Component}
    </div>
  );
};

// className =
// "flex-1 w-full h-10 p-2 text-black bg-white rounded-md shadow-lg dark:text-white dark:shadow-none dark:bg-dark-input focus:outline-none";
