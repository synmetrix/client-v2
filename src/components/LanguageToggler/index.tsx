import { Select } from "antd";
import { useTranslation } from "react-i18next";

import type { FC } from "react";

const LanguageToggler: FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (val: string) => {
    i18n.changeLanguage(val);
  };

  return (
    <Select
      dropdownStyle={{ width: 75 }}
      value={i18n.language}
      onChange={toggleLanguage}
      options={[
        {
          label: "РУ",
          value: "ru",
        },
        {
          label: "EN",
          value: "en",
        },
        {
          label: "中国人",
          value: "zh",
        },
      ]}
    />
  );
};

export default LanguageToggler;
