import { AnimatePresence, motion } from "framer-motion";

import { IconsArrow } from "../ui/icons/IconsArrow";

import { useTranslation } from "react-i18next";
import { TabMobileSidebar } from "../ui/tab/TabMobileSidebar";
import { toggleSidebar } from "src/store/theme";
import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";
import { useEffect, useRef, useState } from "react";

// const mobileVariants = {
//   initial: {
//     opacity: 0,
//     width: 0,
//     top: 0,
//     left: -320,
//     transition: {
//       opacity: { duration: 0.3 },
//       width: { duration: 0.6 },
//       delay: 0.5,
//     },
//   },
//   animate: (i: string) => ({
//     opacity: 1,
//     width: i,
//     top: 0,
//     left: 0,
//     transition: {
//       opacity: { duration: 0.1, delay: 0.4 },
//       width: { duration: 0.6 },
//       delay: 0.5,
//     },
//   }),
//   exit: {
//     opacity: 0,
//     width: 0,

//     transition: {
//       opacity: { duration: 0.1 },
//       width: { duration: 0.6 },
//       delay: 0.5,
//     },
//   },
// };
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
  const [width, setWidth] = useState("70vw");

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  console.log(windowSize.current[0]);
  const dispatch = useAppDispatch();
  const { t, ready } = useTranslation();
  const socials = t("nav", { returnObjects: true });

  useEffect(() => {
    if (windowSize.current[0] >= 768) {
      setWidth("50vw");
    } else {
      setWidth("70vw");
    }
    if (toggled) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [toggled]);

  const mobileVariants = {
    initial: {
      opacity: 0,
      width: 0,
      top: 0,
      left: -320,
      transition: {
        opacity: { duration: 0.3 },
        width: { duration: 0.6 },
        delay: 0.5,
      },
    },
    animate: {
      opacity: 1,
      width: width,
      top: 0,
      left: 0,
      transition: {
        opacity: { duration: 0.1, delay: 0.4 },
        width: { duration: 0.6 },
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
      width: 0,

      transition: {
        opacity: { duration: 0.1 },
        width: { duration: 0.6 },
        delay: 0.5,
      },
    },
  };
  if (!ready) return "Loading translations....";
  return (
    <AnimatePresence>
      {toggled ? (
        <>
          <motion.aside
            className={` z-50 absolute flex-col px-4 py-8 items-center justify-between h-screen w-1/2  transition duration-150 delay-200 bg-gray-100 shadow-xl lg:hidden lg:px-2 dark:text-white dark:bg-dark-container `}
            custom={width}
            {...mobileVariants}
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
            <div
              className={`flex flex-col items-start mt-20 ${
                toggled ? "w-1/2 px-2" : ""
              } gap-y-10`}
            >
              {Object.keys(routeMap).map((key) => {
                const name = socials[key as keyof typeof socials];
                const iconName =
                  routeMap[key as keyof typeof routeMap].iconName;
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
          <motion.div
            className="absolute top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-50"
            transition={{
              initial: {
                opacity: 0,
                transition: {
                  delay: 0.6,
                },
              },
              animate: {
                opacity: 1,
                transition: {
                  delay: 0.6,
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  delay: 0.6,
                },
              },
            }}
          />
        </>
      ) : null}
    </AnimatePresence>
  );
};
