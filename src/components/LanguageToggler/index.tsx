import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Button from "@/components/Button";

import ArrowIcon from "@/assets/arrow-middle.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const langMap = {
  en: "EN",
  ru: "РУ",
  zh: "中国人",
};

const LanguageToggler: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const toggleLanguage = (val: string) => {
    i18n.changeLanguage(val);
  };

  return (
    <Dropdown
      trigger={["click"]}
      onOpenChange={setIsOpen}
      menu={{
        items: [
          { key: "en", label: "EN", onClick: () => toggleLanguage("en") },
          { key: "ru", label: "РУ", onClick: () => toggleLanguage("ru") },
          { key: "zh", label: "中国人", onClick: () => toggleLanguage("zh") },
        ],
      }}
    >
      <Button>
        <div className={styles.dropdownContainer}>
          <span className={styles.dropdown}>
            {langMap[i18n.language as keyof typeof langMap]}
          </span>
          <span className={cn(styles.icon, { [styles.rotate]: isOpen })}>
            <ArrowIcon />
          </span>
        </div>
      </Button>
    </Dropdown>
  );
};

export default LanguageToggler;
