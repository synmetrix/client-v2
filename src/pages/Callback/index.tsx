import { Result } from "antd";
import { useTranslation } from "react-i18next";

import { EXPLORE, SIGNIN } from "@/utils/constants/paths";
import BasicLayout from "@/layouts/BasicLayout";
import AuthTokensStore from "@/stores/AuthTokensStore";
import Button from "@/components/Button";
import useLocation from "@/hooks/useLocation";
import { fetchRefreshToken } from "@/hooks/useAuth";

import s from "./index.module.less";

const Callback: React.FC = () => {
  const { t } = useTranslation(["callback"]);
  const [error, setError] = useState<boolean>(false);
  const { setAuthData } = AuthTokensStore();
  const [location, setLocation] = useLocation();
  const { refresh_token } = location.query;

  const onCallback = async () => {
    const result = await fetchRefreshToken(refresh_token);

    if (result.error) {
      setError(true);
    } else {
      setAuthData({
        accessToken: result.jwt_token,
        refreshToken: result.refresh_token,
      });
      setLocation(EXPLORE);
    }
  };

  useEffect(() => {
    onCallback();
  }, []);

  return (
    <BasicLayout>
      <Result
        className={s.wrapper}
        status={error ? "error" : "success"}
        title={error ? t("error.title") : t("title")}
        subTitle={error ? t("error.subtitle") : t("subtitle")}
        extra={[
          <Button type="primary" key="back" onClick={() => setLocation(SIGNIN)}>
            {t("action")}
          </Button>,
        ]}
      />
    </BasicLayout>
  );
};

export default Callback;
