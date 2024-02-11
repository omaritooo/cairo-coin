import { useState } from "react";
import { Tabs } from "src/services/types/ui";

interface Props {
  Tabs: Tabs[];
  emitTab: (e: Tabs) => void;
}
export const NavigationTabs = ({ Tabs, emitTab }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabChanger = (e: Tabs) => {
    setActiveTab(e.id);
    emitTab(e);
  };
  return (
    <div className="bg-light-input dark:bg-dark-input div bg-black-500 flex h-fit w-fit gap-x-1 rounded-lg p-1 text-sm text-black drop-shadow-md dark:text-white">
      {Tabs.map((el: Tabs) => (
        <button
          className={
            `${
              activeTab === el.id ? "bg-light-primary dark:bg-dark-primary" : ""
            }` +
            " flex-1 whitespace-nowrap rounded-md px-4  py-2 transition duration-150 ease-in-out"
          }
          key={el.id}
          onClick={() => tabChanger(el)}
          type="button"
        >
          {el.name}
        </button>
      ))}
    </div>
  );
};
