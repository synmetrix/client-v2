import { SettingOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import Button from "@/components/Button";
import DataSourceTag from "@/components/DataSourceTag";
import ConfirmModal from "@/components/ConfirmModal";
import formatTime from "@/utils/helpers/formatTime";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Paragraph } = Typography;

interface DataSourceCardProps {
  dataSource: DataSourceInfo & { login?: string };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onGenerate?: (id: string) => void;
  withGeneration?: boolean;
}

const DataSourceCard: FC<DataSourceCardProps> = ({
  dataSource,
  onEdit = () => {},
  onDelete = () => {},
  onGenerate = () => {},
  withGeneration = true,
}) => {
  const { t } = useTranslation(["common"]);
  const { id, name, dbParams, type, updatedAt, createdAt, login } = dataSource;

  return (
    <div>
      <Card
        style={{ position: "static" }}
        bodyStyle={{ padding: 16 }}
        headStyle={{ padding: 16 }}
        title={
          <Button
            block
            type="link"
            className={styles.btn}
            style={{ textAlign: "left" }}
            onClick={() => id && onEdit(id)}
          >
            <Paragraph
              ellipsis
              style={{ display: "inline-block", width: "95%" }}
              className={cx(styles.paragraph, styles.btn)}
            >
              {name}
            </Paragraph>
          </Button>
        }
        extra={
          <Dropdown
            className={styles.btn}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "edit",
                  label: t("common:words.edit"),
                  onClick: () => id && onEdit(id),
                },
                {
                  key: "delete",
                  className: styles.deleteItem,
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_datasource")}
                      className={styles.deleteText}
                      onConfirm={() => id && onDelete(id)}
                    >
                      {t("common:words.delete")}
                    </ConfirmModal>
                  ),
                },
                withGeneration
                  ? {
                      key: "generate",
                      label: t("common:words.generate_models"),
                      onClick: () => id && onGenerate(id),
                    }
                  : null,
              ],
            }}
          >
            <SettingOutlined key="setting" />
          </Dropdown>
        }
      >
        <ul className={styles.list}>
          {dbParams?.host && (
            <li className={styles.listItem}>
              <span className={styles.label}>{t("common:words.host")}</span>
              <Paragraph
                className={styles.paragraph}
                style={{
                  display: "inline",
                  textAlign: "right",
                  width: "80%",
                }}
                ellipsis
              >
                {dbParams.host}
              </Paragraph>
            </li>
          )}

          {login && (
            <li className={styles.listItem}>
              <span className={styles.label}>{t("common:words.login")}</span>
              <Paragraph
                className={styles.paragraph}
                style={{
                  display: "inline",
                  textAlign: "right",
                  width: "80%",
                }}
                ellipsis
              >
                {login}
              </Paragraph>
            </li>
          )}

          <li className={styles.listItem}>
            <span className={styles.label}>{t("common:words.type")}</span>
            <DataSourceTag dataSource={type} />
          </li>

          <li className={styles.listItem}>
            <span className={styles.label}>{t("common:words.updated_at")}</span>
            <Paragraph
              className={styles.paragraph}
              style={{
                display: "inline",
                textAlign: "right",
                width: "80%",
              }}
              ellipsis
            >
              {formatTime(updatedAt)}{" "}
            </Paragraph>
          </li>

          <li className={styles.listItem}>
            <span className={styles.label}>{t("common:words.created_at")}</span>
            <Paragraph
              className={styles.paragraph}
              style={{
                display: "inline",
                textAlign: "right",
                width: "80%",
              }}
              ellipsis
            >
              {formatTime(createdAt)}{" "}
            </Paragraph>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default DataSourceCard;
