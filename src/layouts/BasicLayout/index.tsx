import { Layout } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/BurgerMenu";

import styles from "./index.module.less";

import type { ReactNode } from "react";

const { Content } = Layout;

export type BasicLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

const BasicLayout: React.FC<BasicLayoutProps> = ({ header, children }) => {
  const responsive = useResponsive();
  const isMobile = responsive.md === false;

  return (
    <Layout className={styles.root}>
      <Layout>
        <Header
          content={isMobile ? <BurgerMenu>{header}</BurgerMenu> : header}
          withLogo
          bordered
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
