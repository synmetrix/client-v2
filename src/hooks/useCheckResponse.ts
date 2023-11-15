import { history } from "@vitjs/runtime";
import { message } from "antd";
import { useDeepCompareEffect } from "ahooks";
import { useTranslation } from "react-i18next";

import type { UseMutationState } from "urql";

const noop = () => {};

type Meta = {
  successMessage?: string | null;
  errorMessage?: string;
  showMessage?: boolean;
  showResponseMessage?: boolean;
};

type Callback = (data: any, error?: any) => void;

const useCheckResponse = (
  response: UseMutationState,
  cb: Callback = noop,
  meta: Meta = {
    showMessage: true,
    showResponseMessage: true,
  }
) => {
  const { t } = useTranslation(["common"]);
  const {
    successMessage = t("common:alerts.default_success"),
    errorMessage = t("common:alerts.default_failure"),
    showMessage = true,
    showResponseMessage = true,
  } = meta;

  useDeepCompareEffect(() => {
    if (response.data) {
      if (showMessage && successMessage) {
        message.success(successMessage);
      }

      cb(response.data);
    }
  }, [response.data]);

  useDeepCompareEffect(() => {
    if (response.error) {
      console.log(response.error);
      const responseMessage = response.error?.message;

      if (responseMessage?.includes("JWSInvalidSignature")) {
        history.push("/403");
      }

      if (showMessage) {
        message.error(
          showResponseMessage ? responseMessage || errorMessage : errorMessage
        );
      }
      cb(null, response.error);
    }
  }, [response.error]);
};

export default useCheckResponse;
