import { Col, Row } from "antd";

import styles from "./index.module.less";

import type { FC } from "react";

interface RequestInfoProps {
  id: string;
  path: string;
  duration: number;
  startTime: string;
  endtTime: string;
  queryKey: string;
}

const RequestInfo: FC<RequestInfoProps> = ({
  id,
  path,
  duration,
  startTime,
  endtTime,
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
          <span className={styles.label}>Path:</span> {path}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Duration:</span> {duration}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>Start Time:</span> {startTime}
        </div>
      </Col>
      <Col span={24} md={12}>
        <div className={styles.item}>
          <span className={styles.label}>End Time:</span> {endtTime}
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
