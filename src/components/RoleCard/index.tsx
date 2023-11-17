import { Button, Card, Col, Collapse, Dropdown, Row, Space } from "antd";
import { ArrowRightOutlined, SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { AccessTypeWrapper } from "@/components/AccessType";
import ConfirmModal from "@/components/ConfirmModal";
import formatTime from "@/utils/helpers/formatTime";
import type { AccessList } from "@/types/access";

import styles from "./index.module.less";

import type { FC } from "react";

interface RoleCardProps {
  accessList: AccessList;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const RoleCard: FC<RoleCardProps> = ({ accessList, onRemove, onEdit }) => {
  const { t } = useTranslation(["settings", "common"]);

  return (
    <Card
      title={accessList.name}
      style={{ position: "static" }}
      bodyStyle={{ padding: 16 }}
      headStyle={{ padding: 16 }}
      extra={
        <Dropdown
          className={styles.btn}
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "edit",
                label: t("common:words.edit"),
                onClick: () => onEdit?.(accessList.id),
              },
              {
                key: "delete",
                label: (
                  <ConfirmModal
                    title={t("common:words.delete_role")}
                    onConfirm={() => onRemove?.(accessList.id)}
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
      <Space className={styles.info} direction="vertical" size={14}>
        <Row className={styles.item} justify={"space-between"}>
          <Col className={styles.label}>{t("common:words.created_at")}</Col>
          <Col className={styles.value}>{formatTime(accessList.createdAt)}</Col>
        </Row>
        <Row className={styles.item} justify={"space-between"}>
          <Col className={styles.label}>{t("common:words.updated_at")}</Col>
          <Col className={styles.value}>{formatTime(accessList.updatedAt)}</Col>
        </Row>
        <Collapse ghost style={{ padding: 0 }} expandIcon={() => null}>
          <Collapse.Panel
            className={styles.panel}
            header={
              <Button type="default" block icon={<ArrowRightOutlined />}>
                {accessList.count} {t("common:words.data_sources")}
              </Button>
            }
            key={"1"}
          >
            {accessList.dataSources.map((d) => {
              const permissions =
                accessList?.config?.datasources?.[d.id]?.cubes;
              return (
                <Space key={d.id} size={29}>
                  <span>{d.name}</span>
                  <AccessTypeWrapper
                    dataSourceId={d.id}
                    permissions={permissions}
                  />
                </Space>
              );
            })}
          </Collapse.Panel>
        </Collapse>
      </Space>
    </Card>
  );
};

export default RoleCard;
