import { history } from "@vitjs/runtime";
import { message } from "antd";
import { useDeepCompareEffect } from "ahooks";

import type { UseMutationState } from "urql";

const noop = () => {};
const DEFAULT_SUCCESS = "Succefully finished";
const DEFAULT_FAILURE = "Something went wrong";

type Meta = {
  successMessage?: string;
  errorMessage?: string;
};

type Callback = (data: any, error?: any) => void;

const useCheckResponse = (
  response: UseMutationState,
  cb: Callback = noop,
  meta: Meta = {}
) => {
  const { successMessage = DEFAULT_SUCCESS, errorMessage = DEFAULT_FAILURE } =
    meta;

  useDeepCompareEffect(() => {
    if (response.data) {
      if (successMessage) {
        message.success(successMessage);
      }

      cb(response.data);
    }
  }, [response.data]);

  useDeepCompareEffect(() => {
    if (response.error) {
      const responseMessage = response.error?.message;

      if (responseMessage?.includes("JWSInvalidSignature")) {
        history.push("/403");
      }

      if (errorMessage !== "") {
        message.error(responseMessage || errorMessage);
      }
      cb(null, response.error);
    }
  }, [response.error]);
};

export default useCheckResponse;
