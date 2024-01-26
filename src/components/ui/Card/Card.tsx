import { motion, AnimatePresence } from "framer-motion";
import { ReactElement, ReactNode } from "react";
import { variants } from "src/services/variants/sidebarVariants";

interface Props {
  children: string | ReactNode;
  name: string;
  icon?: ReactElement;
  loading: boolean;
  size?: string;
  color?: string;
}

export const Card = ({
  children,
  name,
  color,
  icon,
  loading,
  size = "",
}: Props) => (
  <article
    className={`relative flex flex-col justify-between col-span-8 sm:col-span-2 md:col-span-4 lg:col-span-2 w-full ${
      size ? size : "h-40"
    } px-4 py-4 overflow-hidden  ${
      color
        ? color
        : "bg-white dark:bg-dark-container text-black dark:text-white"
    } shadow-lg min-h-40  grid-col rounded-xl`}
  >
    <div className="z-20 flex items-center justify-between w-full">
      <h1 className="flex items-center text-2xl font-semibold  gap-x-2 ">
        {name}
      </h1>
      {icon}
    </div>
    {loading ? <Card.Skeleton /> : children}
  </article>
);

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
