// import { ButtonLocale } from "../ui/button/ButtonLocale";
import { useAppDispatch, useAppSelector } from "src/services/hooks/useStore";
import { ButtonToggle } from "../ui/button/ButtonToggle";
import IconsBank from "../ui/icons/IconsBank";
import IconsBinance from "../ui/icons/IconsBinance";
import IconsBlackMarket from "../ui/icons/IconsBlackMarket";
import { indicatorColor, toFixedWithCommas } from "src/services/helpers";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";
import { ReactElement } from "react";
import { IconsArrow } from "../ui/icons/IconsArrow";
import { toggleSidebar } from "src/store/theme";
// import { useQuery } from "react-query";
// import { api } from "src/services/api/apiClient";
// import { modifyData } from "src/store/home";

export const Header = () => {
  const headers = useAppSelector((state) => state.home.headers);
  const { pathname } = useLocation();
  const toggled = useAppSelector((state) => state.theme.mobileSidebarToggle);
  const dispatch = useAppDispatch();
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
    <header className="flex flex-col items-center justify-between w-full py-2 rounded-md gap-y-4 lg:flex-row-reverse lg:px-0 dark:text-white drop-shadow-md gap-x-4 h-fit">
      <div className="flex flex-row justify-between w-full lg:w-fit">
        <button
          className="flex items-center justify-center w-fit lg:hidden"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
          type="button"
        >
          <IconsArrow toggled={toggled} />
        </button>
        <ButtonToggle />
      </div>
      <div className="flex items-center gap-x-5">
        <AnimatePresence>
          {headers ? (
            pathname === "/" ? (
              <motion.div
                {...variants}
                className="flex items-center h-10 px-2 rounded-lg shadow-md bg-light-container dark:bg-dark-container gap-x-3"
              >
                <IconsBank />
                <span>Bank rate</span>
                <span className="flex items-baseline gap-x-1">
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
                    headers.indicator as number
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

      {/* <ButtonLocale /> */}
    </header>
  );
};

const Skeleton = () => (
  <div className="flex items-center w-20 h-10 rounded-lg shadow-md bg-light-container dark:bg-dark-container gap-x-2">
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
  <div className="flex items-center h-10 px-2 rounded-lg shadow-md gap-x-2 bg-light-container dark:bg-dark-container">
    {icon}
    {toFixedWithCommas(`${value}`, 2)}
  </div>
);
