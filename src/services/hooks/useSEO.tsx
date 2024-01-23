import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const names = {
  "/": "nav.home",
  "/history": "nav.history",
  "/conversion": "nav.convert",
  "/faq": "nav.faq",
};
export const Seo = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{t(names[title as keyof typeof names])}</title>
      <meta content={description} name="description" />
    </Helmet>
  );
};
