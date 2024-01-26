// import { ButtonLocale } from "../ui/button/ButtonLocale";
import { useAppSelector } from "src/services/hooks/useStore";
import { ButtonToggle } from "../ui/button/ButtonToggle";
import IconsBank from "../ui/icons/IconsBank";
import IconsBinance from "../ui/icons/IconsBinance";
import IconsBlackMarket from "../ui/icons/IconsBlackMarket";
import { indicatorColor, toFixedWithCommas } from "src/services/helpers";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";
import { ReactElement } from "react";
// import { useQuery } from "react-query";
// import { api } from "src/services/api/apiClient";
// import { modifyData } from "src/store/home";

export const Header = () => {
  const headers = useAppSelector((state) => state.home.headers);
  const { pathname } = useLocation();
  // const dispatch = useAppDispatch();
  // if (!headers) {
  //   useQuery({
  //     queryKey: ["Home page"],
  //     queryFn: () => api.getData(),
  //     refetchInterval: import.meta.env.VITE_UPDATE_INTERVAL,
  //     refetchIntervalInBackground: true,
  //     onSuccess(data) {
  //       const { data: res } = data.data;
  //       dispatch(modifyData(res));
  //     },
  //   });
  // }
  if (!headers) return;

  return (
    <header className="flex items-center justify-between w-full px-4 lg:px-0 py-2  rounded-md dark:text-white drop-shadow-md gap-x-4 h-fit">
      <div className="flex items-center gap-x-5">
        <AnimatePresence>
          {headers ? (
            pathname === "/" ? (
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
                <div
                  className={`${indicatorColor(
                    headers.indicator
                  )} h-10 flex items-center text-black justify-center w-10 shadow-md rounded-full text-center`}
                >
                  {headers?.indicator}
                </div>
                <HeaderPills
                  icon={<IconsBank />}
                  value={headers.official.Price}
                />
                <HeaderPills icon={<IconsBinance />} value={headers.binance} />
                <HeaderPills
                  icon={<IconsBlackMarket />}
                  value={headers.blackMarket}
                />
              </>
            )
          ) : (
            <Skeleton />
          )}
        </AnimatePresence>
      </div>

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

const HeaderPills = ({
  value,
  icon,
}: {
  value: number | string;
  icon: ReactElement;
}) => (
  <div className="flex gap-x-2 h-10 items-center px-2 rounded-lg shadow-md  bg-light-container dark:bg-dark-container">
    {icon}
    {toFixedWithCommas(`${value}`, 2)}
  </div>
);
