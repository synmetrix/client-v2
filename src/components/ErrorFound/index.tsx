import { Result } from "antd";
import { useTranslation } from "react-i18next";

import type { FC } from "react";

const ErrorFound: FC<ErrorFoundProps> = ({ status }) => {
  const { t } = useTranslation();

  if (status === 500) {
    return (
      <Result
        data-testid="error-found-500"
        status="500"
        title="500"
        subTitle={t("Sorry, something went wrong")}
      />
    );
  }

  if (status === 403) {
    return (
      <Result status="403" title="403" subTitle={t("You have no access")} />
    );
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("Sorry, the page you visited does not exist.")}
    />
  );
};

interface ErrorFoundProps {
  status: number;
}

export default ErrorFound;
