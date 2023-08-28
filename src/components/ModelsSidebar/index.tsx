import { Col, Dropdown, Row, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Select from "@/components/Select";

import BranchIcon from "@/assets/branch.svg";
import VerticalDots from "@/assets/dots-vertical.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: "Menu",
    key: "1",
  },
  {
    label: "Items",
    key: "2",
  },
  {
    label: "Will be",
    key: "3",
  },
  {
    label: "Here",
    key: "4",
  },
];

interface ModelsSidebarProps {
  branches: string[];
}

const ModelsSidebar: FC<ModelsSidebarProps> = ({ branches }) => {
  const { t } = useTranslation(["models", "common"]);
  return (
    <Space className={styles.wrapper} size={16} direction="vertical">
      <Row align="bottom">
        <Col span={23}>
          <Space className={styles.branch} size={10} direction="vertical">
            <div className={styles.label}>{t("common:words.branch")}:</div>

            <Select
              className={styles.select}
              prefixIcon={<BranchIcon />}
              size="large"
              defaultValue={branches.find((b) => b.includes("default"))}
              optionLabelProp="valueLabel"
              suffixIcon={<DownOutlined />}
              options={branches.map((b) => ({
                value: b,
                label: b,
              }))}
            />
          </Space>
        </Col>

        <Col span={1}>
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button type="ghost">
              <VerticalDots />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Space>
  );
};

export default ModelsSidebar;
