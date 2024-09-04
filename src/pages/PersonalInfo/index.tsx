import { Alert, Space } from "antd";
import { useTranslation } from "react-i18next";

import type { GeneralInfo } from "@/components/GeneralInfoForm";
import GeneralInfoForm from "@/components/GeneralInfoForm";
import LogoutSessions from "@/components/LogoutSessions";
import useAuth from "@/hooks/useAuth";
import useLocation from "@/hooks/useLocation";
import AuthTokensStore from "@/stores/AuthTokensStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import { SIGNIN } from "@/utils/constants/paths";

import styles from "./index.module.less";

export type PersonalInfoProps = {
  initialValue?: GeneralInfo;
  error?: string | null;
  onLogout?: () => void;
};

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  initialValue,
  error,
  onLogout = () => {},
}) => {
  const { t } = useTranslation(["settings", "pages"]);

  return (
    <>
      <Space className={styles.wrapper} direction="vertical" size={25}>
        {error && <Alert type="error" message={error} />}
        <GeneralInfoForm initialValue={initialValue} />
        <LogoutSessions onSubmit={onLogout} />
      </Space>
    </>
  );
};

const PersonalInfoWrapper = () => {
  const { t } = useTranslation(["settings", "pages"]);
  const { logout } = useAuth();

  const [, setLocation] = useLocation();
  const { currentUser } = CurrentUserStore();
  const { cleanTokens } = AuthTokensStore();
  const [error, setError] = useState<string | undefined>();

  const onLogout = async () => {
    await logout();
    cleanTokens();
    setLocation(SIGNIN);
  };

  const initialValue = {
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
  };

  return (
    <PersonalInfo
      error={error}
      initialValue={initialValue}
      onLogout={onLogout}
    />
  );
};

export default PersonalInfoWrapper;
