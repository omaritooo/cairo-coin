export const variants = {
  open: {
    width: "20rem",
    transition: {
      damping: 40,
      type: "tween",
      delay: 2,
    },
  },
  closed: {
    width: "fit-content",
    transition: {
      damping: 40,
      type: "tween",
      delay: 2,
    },
  },
};
export const mobileVariants = {
  open: {
    width: "80vw",
    transition: {
      damping: 40,
      type: "tween",
      delay: 2,
    },
  },
  closed: {
    width: "0px",
    transition: {
      damping: 40,
      type: "tween",
      delay: 2,
    },
  },
};
export const textVariants = {
  initial: {
    opacity: 0,
    width: 0,

    transition: {
      opacity: { duration: 0.3 },
      width: { duration: 0.1 },
      delay: 50,
    },
  },
  animate: {
    opacity: 1,
    width: "8rem",
    transition: {
      opacity: { duration: 0.1, delay: 0.4 },
      width: { duration: 0.5 },
      delay: 50,
    },
  },
  exit: {
    opacity: 0,
    width: 0,

    transition: {
      opacity: { duration: 0.1 },
      width: { duration: 0.5 },
      delay: 50,
    },
  },
};
export const darkModeVariants = {
  initial: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: 1,

    transition: {
      opacity: { duration: 0.1, delay: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.1 },
    },
  },
};
