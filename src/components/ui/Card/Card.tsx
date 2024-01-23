import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { variants } from "src/services/variants/sidebarVariants";

interface Props {
  children: string | ReactNode;
  name: string;
  icon: ReactNode;
  loading: boolean;
}

export const Card = ({ children, name, icon, loading }: Props) => {
  console.log("Card Wrapper");
  return (
    <article className="relative flex flex-col justify-between w-full col-span-1 px-4 py-4 overflow-hidden text-black bg-white shadow-lg min-h-40 grid-col dark:text-white dark:bg-dark-container rounded-xl">
      <div className="z-20 flex items-center justify-between w-full">
        <h1 className="flex items-center text-2xl font-semibold text-black gap-x-2 dark:text-dark-titles">
          {name}
        </h1>
        {icon}
      </div>
      {loading ? <Card.Skeleton /> : children}
    </article>
  );
};

const Skeleton = () => (
  <>
    <motion.span
      {...variants}
      className="w-1/2 h-8 p-4 text-5xl bg-gray-200 rounded-lg animate-pulse"
    />
    <AnimatePresence>
      <motion.div {...variants} className="flex justify-between h-fit">
        <span className="w-1/3 h-5 bg-gray-200 rounded-lg animate-pulse" />
        <span className="w-1/4 h-5 bg-gray-200 rounded-lg animate-pulse" />
      </motion.div>
    </AnimatePresence>
  </>
);

Card.Skeleton = Skeleton;
