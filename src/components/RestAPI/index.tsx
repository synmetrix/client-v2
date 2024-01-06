import { Spin, Col, Form, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";

import Input from "@/components/Input";
import Button from "@/components/Button";
import InfoBlock from "@/components/InfoBlock";
import AuthTokensStore from "@/stores/AuthTokensStore";
import validations from "@/utils/helpers/validations";

import styles from "./index.module.less";

import type { FC } from "react";

const CUBEJS_REST_API_URL = import.meta.env.VITE_CUBEJS_REST_API_URL as string;
const CUBEJS_API_DOCS_URL = import.meta.env.VITE_CUBEJS_API_DOCS_URL as string;

interface RestApiProps {
  dataSourceId: string;
  branchId: string;
  query: any;
  limit?: number;
  offset?: number;
}

interface RestApiState {
  loading: boolean;
  response?: string;
  loadingTip?: string;
}

interface ApiResponse {
  error?: string;
  progress?: any;
}

const defaultState = {
  loading: false,
  response: undefined,
};

const RestAPI: FC<RestApiProps> = ({
  dataSourceId,
  branchId,
  query,
  limit = 1000,
  offset = 0,
}) => {
  const { t } = useTranslation(["explore", "common"], { useSuspense: false });
  const { accessToken } = AuthTokensStore();
  const [state, setState] = useState<RestApiState>(defaultState);
  const { control, handleSubmit } = useForm({
    values: {
      json: JSON.stringify(
        {
          limit,
          offset,
          ...query,
        },
        null,
        2
      ),
      token: accessToken,
      url: CUBEJS_REST_API_URL,
      response: state.response,
    },
  });

  const onSubmit = async (values: any) => {
    setState({ ...defaultState, loading: true });

    let response: ApiResponse = {};

    const doFetch = async () => {
      const rawResponse = await fetch(values.url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${values.token}`,
          "Content-Type": "application/json",
          "x-hasura-datasource-id": dataSourceId,
          "x-hasura-branch-id": branchId,
        },
        body: JSON.stringify({
          query: values.json,
        }),
      });

      response = await rawResponse.json();
      if (response?.error === "Continue wait") {
        setState((prev) => ({ ...prev, loadingTip: response?.error }));
        await doFetch();
      }
    };

    try {
      await doFetch();
    } catch (e: any) {
      response.error = e?.message || e;
    }

    setState({ loading: false, response: JSON.stringify(response, null, 2) });
  };

  return (
    <Spin spinning={state.loading} tip={state.loadingTip}>
      <Form layout="vertical" className={styles.form}>
        <Row style={{ width: "100%" }} gutter={10}>
          <Col xs={24}>
            <Input
              className={styles.input}
              label={t("common:form.labels.json")}
              name="json"
              style={{ height: 300, resize: "vertical" }}
              fieldType="textarea"
              control={control}
              rules={{
                required: true,
                validate: (v: string) =>
                  validations.json(v) || t("common:form.errors.json"),
              }}
            />
          </Col>
        </Row>

        <Row style={{ width: "100%" }} gutter={10}>
          <Col xs={12}>
            <Input
              className={styles.input}
              label={t("common:form.labels.auth_token")}
              name="token"
              control={control}
              rules={{
                required: true,
              }}
            />
          </Col>
          <Col xs={12}>
            <Input
              className={cn(styles.input, styles.disabledInput)}
              disabled
              label={t("common:form.labels.url")}
              name="url"
              control={control}
            />
          </Col>
        </Row>

        <Space>
          <Button
            className={styles.submit}
            size="large"
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {t("common:words.send_request")}
          </Button>
          <InfoBlock
            className={styles.infoBlock}
            href={CUBEJS_API_DOCS_URL}
            linkText={t("common:words.rest_api_docs")}
          />
        </Space>

        {state.response && (
          <Row style={{ width: "100%", marginTop: 20 }} gutter={10}>
            <Col xs={24}>
              <Input
                className={cn(styles.input, styles.disabledInput)}
                label={t("common:form.labels.request_output")}
                name="response"
                style={{ height: 300, resize: "vertical" }}
                fieldType="textarea"
                control={control}
                disabled
              />
            </Col>
          </Row>
        )}
      </Form>
    </Spin>
  );
};

export default RestAPI;
