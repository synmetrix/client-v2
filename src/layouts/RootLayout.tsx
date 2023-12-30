import { Provider as UrqlProvider } from "urql";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import ru from "antd/locale/ru_RU";
import en from "antd/locale/en_US";
import { locale } from "dayjs";
import "dayjs/locale/ru";

import URQLClient from "@/URQLClient";

export type RootLayoutProps = {
  children: React.ReactNode;
};

const themeProvider = {
  token: {
    // fontFamily: 'Gotham Pro, sans-serif',
    fontFamily: "Manrope",
    colorPrimary: "#470D69",
  },
  components: {
    Layout: {
      colorBgHeader: "transparent",
      colorBgBody: "transparent",
    },
  },
};

const antLocales = {
  ru,
  en,
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const {
    i18n: { language },
  } = useTranslation();

  locale(language);

  return (
    <ConfigProvider
      theme={themeProvider}
      locale={antLocales[language as keyof typeof antLocales]}
    >
      <UrqlProvider value={URQLClient()}>{children}</UrqlProvider>
    </ConfigProvider>
  );
};

export default RootLayout;
