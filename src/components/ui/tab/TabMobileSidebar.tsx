import { AnimatePresence, motion } from "framer-motion";

import { createElement } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { IconsHome } from "src/components/ui/icons/IconsHome";
import { IconsConvert } from "../icons/IconsConvert";
import { IconsGraphs } from "../icons/IconsGraphs";

import { IconsFaq } from "../icons/IconsFaq";
import { useAppDispatch } from "src/services/hooks/useStore";
import { toggleSidebar } from "src/store/theme";
const textVariants = {
  // initial: {
  //   opacity: 0,
  //   width: 0,

  //   transition: {
  //     opacity: { duration: 0.3 },
  //     width: { duration: 0.5 },
  //     delay: 0.5,
  //   },
  // },
  // animate: {
  //   opacity: 1,
  //   width: "400px",
  //   transition: {
  //     opacity: { duration: 0.3 },
  //     width: { duration: 0.5 },
  //     delay: 0.5,
  //   },
  // },
  // exit: {
  //   opacity: 0,
  //   width: 0,

  //   transition: {
  //     opacity: { duration: 0.1 },
  //     width: { duration: 0.3 },
  //     delay: 0.5,
  //   },
  // },
};

const IconPicker = {
  Home: IconsHome,
  Convert: IconsConvert,
  History: IconsGraphs,
  FAQ: IconsFaq,
};

interface Props {
  toggled: boolean;
  name: string;
  path: string;
  iconName: string;
}

export const TabMobileSidebar = ({ toggled, name, path, iconName }: Props) => {
  const { pathname } = useLocation();
  const attrs = { active: path === pathname };
  const dispatch = useAppDispatch();

  return toggled ? (
    <NavLink onClick={() => dispatch(toggleSidebar())} to={path}>
      <AnimatePresence>
        <motion.span
          {...textVariants}
          className="flex justify-start items-end text-black dark:text-white h-10  rounded-md  py-1 max-h-[40px] "
        >
          {createElement(
            IconPicker[iconName as keyof typeof IconPicker],
            attrs
          )}
          <motion.span className="ml-2 text-lg leading-0">{name}</motion.span>
        </motion.span>
      </AnimatePresence>
    </NavLink>
  ) : null;
};
