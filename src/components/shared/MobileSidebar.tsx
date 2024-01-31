import { AnimatePresence, motion } from "framer-motion";

import { IconsArrow } from "../ui/icons/IconsArrow";

import { useTranslation } from "react-i18next";
import { TabMobileSidebar } from "../ui/tab/TabMobileSidebar";
import { toggleSidebar } from "src/store/theme";
import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";

export const mobileVariants = {
  open: {
    width: "400px",
    height: "100vh",
    display: "block",
    transition: {
      damping: 40,
      type: "tween",
      delay: 0.4,
    },
  },
  closed: {
    width: 0,
    height: "100vh",
    display: "hidden",

    transition: {
      damping: 40,
      type: "tween",
      delay: 0.4,
    },
  },
};
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
export const MobileSidebar = () => {
  // const [toggled, setToggled] = useState<boolean>(false);
  const toggled = useAppSelector((state) => state.theme.mobileSidebarToggle);
  console.log(toggled);
  const dispatch = useAppDispatch();
  const { t, ready } = useTranslation();
  const socials = t("nav", { returnObjects: true });

  if (!ready) return "Loading translations....";
  return (
    <motion.aside
      animate={toggled ? " open" : "closed"}
      className={`absolute top-0 left-0 z-50 flex-col items-center justify-between h-screen px-4 py-8 transition duration-150 bg-gray-100 shadow-xl lg:hidden lg:px-2 dark:text-white dark:bg-dark-container ${
        toggled ? "px-4" : "px-0"
      }`}
      custom={100}
      initial="open"
      variants={mobileVariants}
    >
      <AnimatePresence>
        {toggled ? (
          <div className="flex items-center mb-5 max-h-10 ">
            <motion.img
              className="min-w-[50px] w-[50px] h-[60px] min-h-[50px] py-1 max-w-[50px] max-h-[50px]"
              src="/logo.svg"
              transition={{ duration: 0.7 }}
              whileHover={{ rotateY: 180 }}
            />

            <motion.span className="mr-2 text-xl ltr:ml-2">
              Cairo Coin
            </motion.span>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="flex flex-col items-start w-full px-2 gap-y-10">
        {Object.keys(routeMap).map((key) => {
          const name = socials[key as keyof typeof socials];
          const iconName = routeMap[key as keyof typeof routeMap].iconName;
          const path = routeMap[key as keyof typeof routeMap].path;

          return (
            <TabMobileSidebar
              iconName={iconName}
              key={name}
              name={name}
              path={path}
              toggled={toggled}
            />
          );
        })}
      </div>

      <button
        className={`${
          toggled ? "flex" : "hidden"
        }  items-center mx-auto mt-32 justify-center w-fit`}
        onClick={() => {
          dispatch(toggleSidebar());
        }}
        type="button"
      >
        <IconsArrow toggled={toggled} />
      </button>
    </motion.aside>
  );
};
