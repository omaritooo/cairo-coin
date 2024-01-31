import { AnimatePresence } from "framer-motion";

import { useQuery } from "react-query";
import { BlockLoading } from "src/components/shared/block/BlockLoading";
import { ErrorBlock } from "src/components/shared/block/ErrorBlock";
import { api } from "src/services/api/apiClient";
import { Seo } from "src/services/hooks/useSEO";
import { useAppDispatch } from "src/services/hooks/useStore";
import { modifyData } from "src/store/home";
import { BlockHomeCurrency } from "src/components/shared/block/BlockHomeCurrency";
import { NavigationTabs } from "src/components/shared/NavigationTabs";
import { Tabs } from "src/services/types/ui";
import { useState } from "react";
import { BlockGold } from "src/components/shared/block/BlockGold";

export const HomeView = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("Dollar");

  const { isLoading, isError } = useQuery({
    queryKey: ["Home page"],
    queryFn: () => api.getData(),
    refetchInterval: import.meta.env.VITE_UPDATE_INTERVAL,
    refetchIntervalInBackground: true,
    onSuccess(data) {
      const { data: res } = data.data;
      dispatch(modifyData(res));
    },
  });

  if (isLoading) return <BlockLoading />;
  if (isError) {
    return <ErrorBlock />;
  }
  // console.log("Mounted");

  const tabs = [
    { id: 0, name: "Dollar" },
    { id: 1, name: "Gold" },
  ];

  const transactionReceiver = (e: Tabs) => {
    console.log(e);
    setActiveTab(e.name);
  };
  return (
    <div className="flex flex-col flex-1 w-full py-2 my-2  gap-y-4">
      <Seo title="/" />
      <NavigationTabs Tabs={tabs} emitTab={transactionReceiver} />

      <AnimatePresence>
        {activeTab === "Dollar" ? (
          <BlockHomeCurrency isLoading={isLoading} />
        ) : (
          <BlockGold isLoading={isLoading} />
        )}
      </AnimatePresence>
    </div>
  );
};
