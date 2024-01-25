// import { ButtonLocale } from "../ui/button/ButtonLocale";
import { useAppSelector } from "src/services/hooks/useStore";
import { ButtonToggle } from "../ui/button/ButtonToggle";
import IconsBank from "../ui/icons/IconsBank";
import IconsBinance from "../ui/icons/IconsBinance";
import IconsBlackMarket from "../ui/icons/IconsBlackMarket";
import { toFixedWithCommas } from "src/services/helpers";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";

export const Header = () => {
  const headers = useAppSelector((state) => state.home.headers);
  const { pathname } = useLocation();

  return (
    <header className="flex items-center justify-between w-full px-4 lg:px-0 py-2  rounded-md dark:text-white drop-shadow-md gap-x-4 h-fit">
      {headers ? (
        <div className="flex items-center gap-x-5">
          <AnimatePresence>
            {pathname === "/" ? (
              <motion.div
                {...variants}
                className="bg-light-container dark:bg-dark-container flex gap-x-3 h-10 items-center px-2 rounded-lg shadow-md"
              >
                <IconsBank />
                <span>Bank rate</span>
                <span className="flex gap-x-1 items-baseline">
                  {toFixedWithCommas(`${headers?.official.Price}`, 2)}{" "}
                  <span
                    className={`text-xs ${
                      headers.official.Rate < 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {toFixedWithCommas(`${headers?.official.Rate}`, 2)}%
                  </span>
                </span>{" "}
              </motion.div>
            ) : (
              <>
                <div className="h-10 flex items-center justify-center w-10 shadow-md rounded-full text-center bg-light-container dark:bg-dark-container">
                  {headers?.indicator}
                </div>
                <div className="bg-light-container dark:bg-dark-container flex gap-x-2 h-10 items-center px-2 rounded-lg shadow-md">
                  <IconsBank />
                  {toFixedWithCommas(`${headers?.official.Price}`, 2)}
                </div>

                <div className="bg-light-container dark:bg-dark-container flex gap-x-2 h-10 items-center px-2 rounded-lg shadow-md">
                  <IconsBinance />
                  {toFixedWithCommas(`${headers?.binance}`, 2)}
                </div>

                <div className="bg-light-container dark:bg-dark-container flex gap-x-2 h-10 items-center px-2 rounded-lg shadow-md">
                  <IconsBlackMarket />
                  {toFixedWithCommas(`${headers?.blackMarket}`, 2)}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Skeleton />
      )}
      <ButtonToggle />
      {/* <ButtonLocale /> */}
    </header>
  );
};

const Skeleton = () => (
  <div className="bg-light-container dark:bg-dark-container flex gap-x-2 h-10 w-20 items-center  rounded-lg shadow-md">
    <div className="w-full h-full bg-gray-300 animate-pulse" />
  </div>
);
