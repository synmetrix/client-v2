import { Layout } from "antd";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { User } from "@/types/user";

import styles from "./index.module.less";

const { Content } = Layout;

export type BasicLayoutProps = {
  children: React.ReactNode;
  user?: User | null;
};

const BasicLayout: React.FC<BasicLayoutProps> = ({ user = null, children }) => {
  return (
    <Layout className={styles.root}>
      <Header user={user} />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default BasicLayout;
