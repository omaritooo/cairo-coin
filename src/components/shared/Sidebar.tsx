import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconsArrow } from "../ui/icons/IconsArrow";
import {
  variants,
  textVariants,
} from "../../services/variants/sidebarVariants";

import { TabSidebar } from "../ui/tab/TabSidebar";
import { useTranslation } from "react-i18next";

interface Route {
  [key: string]: {
    path: string;
    iconName: string;
  };
}

const routeMap: Route = {
  home: {
    iconName: "Home",
    path: "/",
  },
  convert: { iconName: "Convert", path: "/conversion" },
  history: {
    iconName: "History",
    path: "/history",
  },
  faq: {
    iconName: "FAQ",
    path: "/faq",
  },
};
export const Sidebar = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const { t, ready } = useTranslation();
  const socials = t("nav", { returnObjects: true });

  if (!ready) return "Loading translations....";
  return (
    <motion.aside
      animate={toggled ? " open" : "closed"}
      className="sticky top-0 left-0 flex flex-col items-center justify-between h-screen px-2 py-8 transition duration-150 bg-gray-100 shadow-xl dark:text-white dark:bg-dark-container w-fit"
      initial="closed"
      variants={variants}
    >
      <div className="flex items-center max-h-10 ">
        <motion.img
          className="min-w-[50px] w-[50px] h-[60px] min-h-[50px] py-1 max-w-[50px] max-h-[50px]"
          src="/logo.svg"
          transition={{ duration: 0.7 }}
          whileHover={{ rotateY: 180 }}
        />

        <AnimatePresence>
          {toggled ? (
            <motion.span className="mr-2 text-xl ltr:ml-2" {...textVariants}>
              Cairo Coin
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-start w-full px-2 gap-y-10">
        {Object.keys(routeMap).map((key) => {
          const name = socials[key as keyof typeof socials];
          const iconName = routeMap[key as keyof typeof routeMap].iconName;
          const path = routeMap[key as keyof typeof routeMap].path;

          return (
            <TabSidebar
              iconName={iconName}
              key={name}
              name={name}
              path={path}
              toggled={toggled}
            />
          );
        })}
      </div>
      <div
        className={
          "flex flex-col items-start justify-center  gap-y-5" +
          ` ${toggled} ? 'mr-auto' : 'mx-auto`
        }
      >
        <button
          className="flex items-center justify-center w-full"
          onClick={() => {
            setToggled(!toggled);
          }}
          type="button"
        >
          <IconsArrow toggled={toggled} />
        </button>
      </div>
    </motion.aside>
  );
};
