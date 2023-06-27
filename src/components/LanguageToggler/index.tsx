import { useTranslation } from "react-i18next";

import type { FC } from "react";

const LanguageToggler: FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const lng = i18n.language;
    console.log(lng);
    i18n.changeLanguage(lng === "ru" ? "en" : "ru");
    console.log(t("switch_language"));
  };

  return <button onClick={toggleLanguage}>{t("switch_language")}</button>;
};

export default LanguageToggler;
