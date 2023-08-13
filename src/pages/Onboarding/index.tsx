import { Row, Col } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import DataSourceForm from "@/components/DataSourceForm";
import type { DataSourceForm as DataSourceFormType } from "@/types/dataSource";

import styles from "./index.module.less";

const Onboarding: React.FC = () => {
  const onFinish = (data: DataSourceFormType) => console.log(data);

  return (
    <BasicLayout loggedIn headerProps={{ withLogo: true }}>
      <Row className={styles.container}>
        <Col>
          <DataSourceForm withSteps onFinish={onFinish} />
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default Onboarding;
