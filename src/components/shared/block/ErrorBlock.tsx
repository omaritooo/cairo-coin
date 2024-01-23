import { AnimatePresence, motion } from "framer-motion";
import { variants } from "src/services/variants/sidebarVariants";

export const ErrorBlock = () => (
  <div className="flex-1 w-full h-screen px-6 py-6 rounded-lg my-7 bg-light-container dark:bg-dark-container">
    <AnimatePresence>
      <motion.div
        {...variants}
        className="flex flex-col items-center justify-center h-full gap-y-10"
      >
        <h1 className="text-5xl">Connection Error. Try again.</h1>

        <img className="w-1/2 h-1/2" src="/error.svg" />
      </motion.div>
    </AnimatePresence>
  </div>
);
