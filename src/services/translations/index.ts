import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import en from "./en.json";
const resources = {
  en: {
    translation: { ...en, numberFormat: "{{value, number}}" },
    dir: "ltr",
  },
  ar: {
    translation: { ...ar, numberFormat: "{{value, number}}" },
    dir: "rtl",
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
  react: {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    useSuspense: true,
  },
});

export default i18n;
