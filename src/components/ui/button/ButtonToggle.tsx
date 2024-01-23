import { IconsCrescent } from "../icons/IconsCrescent";
import { IconsSun } from "../icons/IconsSun";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";
import { toggleDarkMode } from "src/store/theme";

export const ButtonToggle = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <button
      className="p-2 outline-none w-fit h-fit"
      onClick={() => dispatch(toggleDarkMode())}
      type="button"
    >
      <AnimatePresence>
        {darkMode ? <IconsCrescent /> : <IconsSun />}
      </AnimatePresence>
    </button>
  );
};
