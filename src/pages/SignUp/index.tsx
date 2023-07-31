import { Row, Col } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignUpForm from "@/components/SignUpForm";
import type { SignUpFormType } from "@/components/SignUpForm";

import styles from "./index.module.less";

const SignUp: React.FC = () => {
  const onSubmit = (data: SignUpFormType) => console.log(data);

  return (
    <BasicLayout headerProps={{ withLogo: true }} page="signup">
      <Row className={styles.container} justify="center" align="middle">
        <Col>
          <SignUpForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignUp;
