import { Row, Col } from "antd";

import BasicLayout from "@/layouts/BasicLayout";
import SignInForm from "@/components/SignInForm";
import type { SignInFormType } from "@/components/SignInForm";

import styles from "./index.module.less";

export default function SignIn(props: any) {
  console.log(props);

  const onSubmit = (data: SignInFormType) => console.log(data);

  return (
    <BasicLayout headerProps={{ withLogo: true }} page="signin">
      <Row className={styles.container} justify="center" align="middle">
        <Col>
          <SignInForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </BasicLayout>
  );
}
