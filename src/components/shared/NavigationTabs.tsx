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
    <div className="flex p-1 text-sm text-black rounded-lg bg-light-input drop-shadow-md dark:bg-dark-input dark:text-white div gap-x-1 bg-black-500 w-fit h-fit">
      {Tabs.map((el: Tabs) => (
        <button
          className={
            `${
              activeTab === el.id ? "bg-light-primary dark:bg-dark-primary" : ""
            }` +
            " transition duration-150 flex-1 whitespace-nowrap  ease-in-out px-4 py-2 rounded-md"
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
