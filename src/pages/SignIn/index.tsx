import { Row, Col, Alert, message } from "antd";
import { useTranslation } from "react-i18next";

import BasicLayout from "@/layouts/BasicLayout";
import SignInForm from "@/components/SignInForm";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";
import type { SignInFormType } from "@/components/SignInForm";
import AuthLinks from "@/components/AuthLinks";

import styles from "./index.module.less";

const SignIn: React.FC = () => {
  const { t } = useTranslation(["sign"]);
  const [error, setError] = useState<string | null>();
  const { login } = useAuth();
  const [location, setLocation] = useLocation();
  const { magicLink } = location.query;
  const isMagicLink = magicLink !== undefined;

  const onSubmit = async (data: SignInFormType) => {
    setError(null);
    const res = await login(data);

    if (res?.magicLink) {
      message.success(t("sign_in.link_sended"));
      return;
    }

    if (res?.error) {
      setError(res.message || res.error);
      return;
    }

    if (!res.magicLink) {
      setLocation("/settings/sources");
    }
  };

  return (
    <BasicLayout header={<AuthLinks currentPage="signin" />}>
      <Row className={styles.container} justify="center" align="middle">
        <Col xs={24} style={{ maxWidth: 356 }}>
          <SignInForm onSubmit={onSubmit} isMagicLink={isMagicLink} />
          {error && <Alert message={<span>{error}</span>} type="error" />}
        </Col>
      </Row>
    </BasicLayout>
  );
};

export default SignIn;
