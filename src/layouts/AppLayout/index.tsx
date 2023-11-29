import { Col, Layout, Row, Typography } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import SideMenu from "@/components/SideMenu";
import { userMenu } from "@/mocks/user";
import useUserData from "@/hooks/useUserData";

import styles from "./index.module.less";

import type { ReactNode } from "react";

export type AppLayoutProps = {
  sidebar?: ReactNode;
  children: ReactNode;
  title?: ReactNode;
  divider?: boolean;
  burgerTitle?: ReactNode;
};

const { Title } = Typography;

const AppLayout: React.FC<AppLayoutProps> = ({
  title = "App",
  burgerTitle,
  divider = false,
  sidebar = null,
  children,
}) => {
  const responsive = useResponsive();
  const { currentUser } = useUserData();

  const content = (
    <Navbar
      username={currentUser.displayName}
      userAvatar={currentUser.avatarUrl}
      userMenu={userMenu}
      teams={currentUser?.teams}
      type={!responsive.lg ? "dropdown" : "inline"}
    />
  );

  return (
    <div className={styles.root}>
      {responsive.lg ? (
        <div style={{ display: "flex", minHeight: "100%" }}>
          <SideMenu />
          {sidebar}
        </div>
      ) : (
        <SideMenu />
      )}
      <Layout className={styles.content}>
        <Header
          title={title}
          bordered={divider}
          content={
            !responsive.lg && sidebar ? (
              <BurgerMenu
                header={
                  <Row
                    className={styles.burgerHeader}
                    justify={"space-between"}
                    align={"middle"}
                  >
                    <Col>
                      <Title
                        className={styles.burgerTitle}
                        style={{ margin: 0 }}
                        level={4}
                      >
                        {burgerTitle || title}
                      </Title>
                    </Col>
                    {sidebar && (
                      <Col className={styles.burgerMobile}>{content}</Col>
                    )}
                  </Row>
                }
              >
                <div style={{ margin: "0 -30px" }}>
                  {!responsive.lg && sidebar}
                  {!sidebar && content}
                </div>
              </BurgerMenu>
            ) : (
              content
            )
          }
        />
        <div className={styles.main}>{children}</div>
        <Footer />
      </Layout>
    </div>
  );
};

export default AppLayout;
