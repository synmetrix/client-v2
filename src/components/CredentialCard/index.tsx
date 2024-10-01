import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import formatTime from "@/utils/helpers/formatTime";
import type { Credentials } from "@/types/credential";

import styles from "./index.module.less";

import type { FC } from "react";

const { Paragraph } = Typography;

interface CredentialCardProps {
  credential: Credentials;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CredentialCard: FC<CredentialCardProps> = ({
  credential,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { t } = useTranslation(["common"]);
  const { id, username, dataSource, updatedAt, createdAt, user } = credential;
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
              title={user?.display_name}
              style={{ display: "inline-block", width: "95%" }}
              className={cx(styles.paragraph, styles.btn)}
            >
              {user?.display_name}
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
              ],
            }}
          >
            <SettingOutlined key="setting" />
          </Dropdown>
        }
      >
        <ul className={styles.list}>
          {dataSource?.name && (
            <li className={styles.listItem}>
              <span className={styles.label}>
                {t("common:form.labels.data_source")}
              </span>
              <Paragraph
                title={dataSource.name}
                className={styles.paragraph}
                style={{
                  display: "inline",
                  textAlign: "right",
                  width: "80%",
                }}
                ellipsis
              >
                {dataSource.name}
              </Paragraph>
            </li>
          )}

          {username && (
            <li className={styles.listItem}>
              <span className={styles.label}>{t("common:words.login")}</span>
              <Paragraph
                title={username}
                className={styles.paragraph}
                style={{
                  display: "inline",
                  textAlign: "right",
                  width: "80%",
                }}
                ellipsis
              >
                {username}
              </Paragraph>
            </li>
          )}

          <li className={styles.listItem}>
            <span className={styles.label}>{t("common:words.updated_at")}</span>
            <Paragraph
              title={formatTime(updatedAt)}
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
              title={formatTime(createdAt)}
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

export default CredentialCard;
