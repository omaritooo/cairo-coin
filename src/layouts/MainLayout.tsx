import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "../components/shared/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "src/services/hooks/useStore";
import { Header } from "src/components/shared/Header";

export const MainLayout = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  return (
    <main
      className={`flex w-screen mt-0 transition duration-150 bg-gray-100 dark:bg-dark-bg ${
        darkMode ? "dark" : ""
      }`}
    >
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.main className="flex flex-col flex-wrap justify-center w-full min-h-screen px-5 py-6 transition duration-150 bg-gray-200 dark:bg-dark-bg gap-x-7 gap-y-2">
          <Header />
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </main>
  );
};
