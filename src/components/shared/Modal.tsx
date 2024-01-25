import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  shouldShow: boolean;
  onRequestClose: () => void;
  children: string | ReactNode;
}
const newspaper = {
  hidden: {
    y: -50,
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
export const Modal = ({ shouldShow, onRequestClose, children }: Props) => (
  <AnimatePresence>
    {shouldShow ? (
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed flex items-center justify-center px-4 z-[100] h-full w-full bg-black/40 overflow-auto"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={onRequestClose}
      >
        <motion.div
          animate="visible"
          className="w-full sm:w-3/4 lg:w-1/3 h-fit flex flex-col min-h-32 p-5 bg-white dark:bg-gray-800 text-black dark:text-white/80 rounded-lg"
          exit="exit"
          initial="hidden"
          onClick={(e) => {
            e.stopPropagation();
          }}
          variants={newspaper}
        >
          <button
            className="text-xl w-fit mr-auto"
            onClick={onRequestClose}
            type="button"
          >
            X
          </button>
          <div className="p-4">{children}</div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
