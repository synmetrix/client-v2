import { Row, Col } from "antd";

import DataSourceForm from "@/components/DataSourceForm";
import type { DataSourceForm as DataSourceFormType } from "@/types/dataSource";
import AppLayout from "@/layouts/AppLayout";

import styles from "./index.module.less";

const Onboarding: React.FC = () => {
  const onFinish = (data: DataSourceFormType) => console.log(data);

  return (
    <AppLayout>
      <Row className={styles.container}>
        <Col>
          <DataSourceForm withSteps onFinish={onFinish} />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Onboarding;
