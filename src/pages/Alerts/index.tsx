import { Col, Dropdown, Row, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "@vitjs/runtime";

import PageHeader from "@/components/PageHeader";
import AlertModal from "@/components/AlertModal";
import type { Alert, AlertFormType } from "@/types/alert";
import type { QueryState } from "@/types/queryState";
import AppLayout from "@/layouts/AppLayout";
import ConfirmModal from "@/components/ConfirmModal";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import useAppSettings from "@/hooks/useAppSettings";
import useAlerts from "@/hooks/useAlerts";
import useCheckResponse from "@/hooks/useCheckResponse";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";
import { DOCS_CREATE_ALERT_LINK } from "@/utils/constants/links";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import formatTime from "@/utils/helpers/formatTime";
import StatusBadge from "@/components/StatusBadge";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface AlertsProps {
  alerts: Alert[];
  query: QueryState;
}

const Alerts: React.FC<AlertsProps> = ({
  alerts: initialAlerts,
  query: initialQuery,
}) => {
  const { t } = useTranslation(["alerts", "pages"]);
  const responsive = useResponsive();
  const { withAuthPrefix } = useAppSettings();
  const [, setLocation] = useLocation();
  const basePath = withAuthPrefix("/alerts");
  const { currentUser } = CurrentUserStore();
  const { alertId } = useParams();

  const alerts = useMemo(
    () => (initialAlerts?.length ? initialAlerts : currentUser.alerts || []),
    [initialAlerts, currentUser]
  ) as Alert[];

  const curAlert = useMemo(
    () => alerts.find((a) => a.id === alertId),
    [alertId, alerts]
  );

  const {
    updateAlert,
    onSendTest,
    mutations: {
      updateMutationData,
      deleteMutationData,
      execDeleteMutation,
      sendTestMutationData,
    },
  } = useAlerts({
    alertId,
  });

  const query = useMemo(() => {
    if (curAlert) {
      return curAlert?.exploration?.playground_state;
    }

    return initialQuery || SAMPLE_EXPLORATION.playground_state;
  }, [curAlert, initialQuery]);

  const onEdit = (alert: Alert) => {
    setLocation(`${basePath}/${alert.id}`);
  };

  const onDelete = (alert: Alert) => {
    execDeleteMutation({ id: alert.id });
  };

  const onClose = () => {
    setLocation(basePath);
  };

  useCheckResponse(updateMutationData, () => onClose(), {
    successMessage: t("alert_updated"),
  });

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("alert_deleted"),
  });

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("test_alert_sent"),
  });

  const onSubmit = (values: AlertFormType) => {
    const doesAlertExist = Boolean(curAlert?.id);

    if (doesAlertExist) {
      updateAlert(values);
      return;
    }
  };

  useEffect(() => {
    if (alerts?.length && alertId && !curAlert) {
      message.error(t("not_found.wrong_id"));
      setLocation(basePath);
    }
  }, [alertId, alerts?.length, basePath, curAlert, setLocation, t]);

  const renderCard = (alert: Alert) => {
    return (
      <Card
        title={alert.name}
        titleTooltip={alert.name}
        onTitleClick={() => onEdit(alert)}
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
                      title={t("common:words.delete_alert")}
                      onConfirm={() => onDelete(alert)}
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
        <dl>
          {alert.creator && (
            <>
              <dt>{t("common:words.creator")}</dt>
              <dd title={alert.creator.email}>
                <div className={styles.creator}>
                  <Avatar
                    className={styles.avatar}
                    width={!responsive.md ? 27 : 36}
                    height={!responsive.md ? 27 : 36}
                    username={alert.creator.displayName}
                    img={alert.creator.avatarUrl}
                  />
                  <div className={styles.email}>{alert.creator.email}</div>
                </div>
              </dd>
            </>
          )}

          {alert.type && (
            <>
              <dt>{t("common:words.type")}</dt>
              <dd title={formatTime(alert.type)}>{formatTime(alert.type)}</dd>
            </>
          )}

          {alert.schedule && (
            <>
              <dt>{t("common:words.schedule")}</dt>
              <dd title={formatTime(alert.schedule)}>
                {formatTime(alert.schedule)}
              </dd>
            </>
          )}

          {alert.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(alert.createdAt)}>
                {formatTime(alert.createdAt)}
              </dd>
            </>
          )}

          {alert.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(alert.updatedAt)}>
                {formatTime(alert.updatedAt)}
              </dd>
            </>
          )}

          {alert.status && (
            <>
              <dt>{t("common:words.status")}</dt>
              <dd>
                <StatusBadge status={alert.status}>
                  {alert.lastActivity}
                </StatusBadge>
              </dd>
            </>
          )}
        </dl>
      </Card>
    );
  };

  return (
    <AppLayout divider title={t("pages:alerts")}>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={!responsive.sm ? t("title_mobile") : t("title")}
          action={
            <Space size={!responsive.sm ? 5 : 10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {!responsive.sm ? t("action_mobile") : t("action")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
          target="_blank"
          href={DOCS_CREATE_ALERT_LINK}
        />
        <div className={styles.body}>
          <Row justify={"start"} gutter={[32, 32]}>
            {alerts.map((a) => (
              <Col xs={24} sm={12} xl={8} key={a.id}>
                {renderCard(a)}
              </Col>
            ))}
          </Row>
        </div>
      </Space>

      <AlertModal
        alert={curAlert}
        query={query}
        isOpen={!!curAlert}
        loading={sendTestMutationData.fetching}
        onClose={onClose}
        onSendTest={onSendTest}
        onSubmit={onSubmit}
      />
    </AppLayout>
  );
};

export default Alerts;
