import { Badge, Col, Row, Space } from "antd";

import Button from "@/components/Button";

import MdIcon from "@/assets/md.svg";
import RestoreIcon from "@/assets/restore.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface VersionPreviewProps {
  version?: string;
  count?: number;
  href?: string;
  onRestore?: () => void;
}

const VersionPreview: FC<VersionPreviewProps> = ({
  version,
  count = 0,
  href,
  onRestore = () => {},
}) => {
  return (
    <Row className={styles.wrapper} align={"middle"}>
      {version && (
        <Col className={styles.version} span={16}>
          <span className={styles.label}>Version:</span>{" "}
          <span className={styles.name} title={version}>
            {version}
          </span>
        </Col>
      )}
      <Col className={styles.count} span={8}>
        <Space size={6}>
          <Button
            className={styles.btn}
            icon={<MdIcon />}
            target="_blank"
            href={href}
          />
          <Badge
            count={count}
            color="#A31BCB"
            style={{
              fontSize: 8,
            }}
            size="small"
          >
            <Button
              className={styles.btn}
              icon={<RestoreIcon />}
              onClick={onRestore}
            />
          </Badge>
        </Space>
      </Col>
    </Row>
  );
};

export default VersionPreview;
