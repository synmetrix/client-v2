import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import type { Maybe, Request_Logs } from "@/graphql/generated";
import formatTime from "@/utils/helpers/formatTime";

import styles from "./index.module.less";

import type { FC } from "react";

const RequestInfo: FC<Partial<Request_Logs> & { queryKey?: Maybe<string> }> = ({
  id,
  path,
  duration,
  start_time,
  end_time,
  queryKey,
}) => {
  const { t } = useTranslation(["logs"]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>{t("query.info.request_id")}:</span>{" "}
          {id}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>{t("query.info.start_time")}:</span>{" "}
          {formatTime(start_time)}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>{t("query.info.path")}:</span> {path}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>{t("query.info.end_time")}:</span>{" "}
          {formatTime(end_time)}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>{t("query:info.duration")}:</span>{" "}
          {duration}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>{t("query.info.query_key_md5")}:</span>{" "}
          {queryKey}
        </div>
      </Col>
    </Row>
  );
};

export default RequestInfo;
