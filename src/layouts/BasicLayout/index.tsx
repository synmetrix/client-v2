import { Layout } from "antd";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import styles from "./index.module.less";

const { Content } = Layout;

export type BasicLayoutProps = {
  children: React.ReactNode;
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  return (
    <Layout className={styles.root}>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};

export default BasicLayout;
