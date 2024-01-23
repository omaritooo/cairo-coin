import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { darkModeVariants } from "src/services/variants/sidebarVariants";

export const ButtonLocale = () => {
  const { i18n } = useTranslation();

  const changer = () => {
    if (i18n.language == "en") {
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <button
      className="flex outline-none gap-x-1 h-fit"
      onClick={changer}
      type="button"
    >
      <AnimatePresence>
        {i18n.language == "en" ? (
          <motion.img
            {...darkModeVariants}
            alt="en"
            height={20}
            src="/flags/uk.svg"
            width={20}
          />
        ) : (
          <motion.img
            {...darkModeVariants}
            alt="ar"
            height={20}
            src="/flags/egypt.svg"
            width={20}
          />
        )}
      </AnimatePresence>
    </button>
  );
};
