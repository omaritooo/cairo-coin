import { ButtonLocale } from "../ui/button/ButtonLocale";
import { ButtonToggle } from "../ui/button/ButtonToggle";

export const Header = () => (
  <header className="flex items-center justify-end w-full px-4 py-2 bg-white rounded-md dark:text-white dark:bg-dark-container drop-shadow-md gap-x-4 h-fit">
    <ButtonToggle />
    <ButtonLocale />
  </header>
);
