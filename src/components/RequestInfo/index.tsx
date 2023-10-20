import { Col, Row } from "antd";

import type { Maybe, Request_Logs } from "@/graphql/generated";

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
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Request ID:</span> {id}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Start Time:</span> {start_time}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Path:</span> {path}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>End Time:</span> {end_time}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Duration:</span> {duration}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Query Key md5:</span> {queryKey}
        </div>
      </Col>
    </Row>
  );
};

export default RequestInfo;
