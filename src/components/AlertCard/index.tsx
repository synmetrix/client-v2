import { Card, Dropdown, Space, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cx from "classnames";

import StatusBadge from "@/components/StatusBadge";
import ConfirmModal from "@/components/ConfirmModal";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import formatTime from "@/utils/helpers/formatTime";
import type { Alert } from "@/types/alert";

import styles from "./index.module.less";

import type { FC } from "react";

interface AlertCardProps {
  alert: Alert;
  onEdit: (alert: Alert) => void;
  onRemove: (alert: Alert) => void;
}

const { Paragraph } = Typography;

const AlertCard: FC<AlertCardProps> = ({ alert, onEdit, onRemove }) => {
  const { t } = useTranslation(["common"]);
  const responsive = useResponsive();
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
            onClick={() => onEdit(alert)}
          >
            <Paragraph
              ellipsis
              style={{ display: "inline-block", width: "95%" }}
              className={cx(styles.paragraph, styles.btn)}
            >
              {alert.name}
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
                  onClick: () => onEdit(alert),
                },
                {
                  key: "delete",
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_datasource")}
                      onConfirm={() => onRemove(alert)}
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
          <li className={styles.listItem}>
            <div className={styles.label}>{t("common:words.creator")}</div>
            <Space className={styles.value} size={5}>
              <Avatar
                width={!responsive.md ? 25 : undefined}
                height={!responsive.md ? 25 : undefined}
                username={alert.creator.displayName}
                img={alert.creator.avatarUrl}
              />
              <span>{alert.creator.email}</span>
            </Space>
          </li>

          <li className={styles.listItem}>
            <div className={styles.label}>
              {t("common:words.delivery_type")}
            </div>
            <span className={styles.value}>{alert.type}</span>
          </li>

          <li className={styles.listItem}>
            <div className={styles.label}>{t("common:words.schedule")}</div>
            <span className={styles.value}>{alert.schedule}</span>
          </li>

          <li className={styles.listItem}>
            <div className={styles.label}>{t("common:words.updated_at")}</div>
            <span className={styles.value}>{formatTime(alert.updatedAt)}</span>
          </li>

          <li className={styles.listItem}>
            <div className={styles.label}>{t("common:words.created_at")}</div>
            <span className={styles.value}>{formatTime(alert.createdAt)}</span>
          </li>

          {alert.status && (
            <li className={styles.listItem}>
              <div className={styles.label}>{t("common:words.status")}</div>
              <span className={styles.value}>
                <StatusBadge status={alert.status}>
                  {alert.lastActivity}
                </StatusBadge>
              </span>
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default AlertCard;
