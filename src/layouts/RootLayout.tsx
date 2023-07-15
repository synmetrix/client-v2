import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";

import createApolloClient from "../../config/apolloClient";

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

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <ConfigProvider theme={themeProvider}>
      <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
    </ConfigProvider>
  );
};

export default RootLayout;
