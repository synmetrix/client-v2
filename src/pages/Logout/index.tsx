import { Result } from "antd";
import { useTranslation } from "react-i18next";

import useAuth from "@/hooks/useAuth";
import AuthTokensStore from "@/stores/AuthTokensStore";
import useLocation from "@/hooks/useLocation";
import Button from "@/components/Button";
import BasicLayout from "@/layouts/BasicLayout";

import s from "./index.module.less";

const Logout: React.FC = () => {
  const { t } = useTranslation(["logout"]);
  const { logout } = useAuth();
  const { cleanTokens } = AuthTokensStore();
  const [, setLocation] = useLocation();

  const onLogout = async () => {
    await logout();
    cleanTokens();
    setLocation("/auth/signin");
  };

  useEffect(() => {
    onLogout();
  }, []);

  return (
    <BasicLayout>
      <Result
        className={s.wrapper}
        status="success"
        title={t("title")}
        subTitle={t("subtitle")}
        extra={[
          <Button type="primary" key="back" onClick={() => window.close()}>
            {t("action")}
          </Button>,
        ]}
      />
    </BasicLayout>
  );
};

export default Logout;
