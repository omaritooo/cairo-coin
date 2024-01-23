import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.1;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.9, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
export const IconsArrow = ({ toggled }: { toggled: boolean }) => (
  <motion.svg
    animate="visible"
    className={`${
      toggled ? "scale-1" : "scale-[-1]"
    } transition duration-150 w-6 h-6 transform`}
    fill="none"
    initial="hidden"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      custom={1}
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={draw}
    />
  </motion.svg>
);
