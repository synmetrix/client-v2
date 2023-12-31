import { Col, Collapse, Radio, Row, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useSetState } from "ahooks";
import { useTranslation } from "react-i18next";

import useAnalyticsQueryMembers from "@/hooks/useAnalyticsQueryMembers";
import Button from "@/components/Button";
import VirtualTable, { cellRenderer } from "@/components/VirtualTable";
import PrismCode from "@/components/PrismCode";
import ComponentSwitcher from "@/components/ComponentSwitcher";
import genName from "@/utils/helpers/genName";
import ExploreSettingsForm from "@/components/ExploreSettingsForm";
import type { ExploreWorkspaceState } from "@/hooks/useExploreWorkspace";
import type { SortBySet } from "@/components/VirtualTable";
import type { ErrorMessage } from "@/types/errorMessage";
import type { CubeMember } from "@/types/cube";
import type { ExplorationState } from "@/types/exploration";

import AlertIcon from "@/assets/alert-logs.svg";
import ReportIcon from "@/assets/report-logs.svg";

import s from "./index.module.less";

import type { FC, ReactNode } from "react";
import type { CollapsePanelProps, RadioChangeEvent } from "antd";

const MAX_ROWS_LIMIT = 10000;

type SortUpdater = (nextSortBy: SortBySet[]) => void;

interface ExploreDataSectionProps extends Omit<CollapsePanelProps, "header"> {
  width?: number;
  height?: number;
  onToggleSection: (section: string) => void;
  onSectionChange: (radioEvent: RadioChangeEvent) => void;
  onOpenModal: (type: string) => void;
  onExec: any;
  onQueryChange: (query: string, ...args: any) => void | SortUpdater;
  disabled: boolean;
  state: ExploreWorkspaceState;
  queryState: ExplorationState;
  disableButtons?: boolean;
  selectedQueryMembers: Record<string, CubeMember[]>;
  isActive: boolean;
  disableSectionChange?: boolean;
  disableSettings?: boolean;
  rowHeight?: number;
  screenshotMode?: boolean;
  emptyDesc?: ReactNode;
  className?: string;
  loading?: boolean;
}

const { Panel } = Collapse;

const ExploreDataSection: FC<ExploreDataSectionProps> = (props) => {
  const {
    width,
    height,
    onToggleSection = () => {},
    onSectionChange = () => {},
    onOpenModal = () => {},
    onExec = () => {},
    onQueryChange = () => {},
    state: workspaceState,
    queryState,
    isActive,
    selectedQueryMembers,
    disableSectionChange,
    disableSettings,
    className,
    emptyDesc,
    screenshotMode,
    rowHeight,
    disabled,
    loading = false,
    disableButtons,
    ...restProps
  } = props;
  const { t } = useTranslation(["explore", "common"]);

  const [currState, updateState] = useSetState({
    section: workspaceState?.dataSection || "sql",
  });

  const formConfig = {
    rows: {
      label: t("data_section.rows_limit"),
      type: "number",
      defaultValue: 1000,
      min: 1,
      max: MAX_ROWS_LIMIT,
      rules: {
        validate: (val: number) =>
          !isNaN(val) && val > 0 && val <= MAX_ROWS_LIMIT,
      },
    },
    offset: {
      label: t("data_section.additional_offset"),
      type: "number",
      min: 0,
      defaultValue: 0,
      rules: {
        validate: (val: number) => !isNaN(val) && val >= 0,
      },
    },
  };

  const {
    order,
    hitLimit,
    limit,
    error,
    rows,
    columns,
    progress,
    settings,
    skippedMembers = [],
    offset = 0,
    settings: { hideCubeNames, hideIndexColumn },
  } = queryState;

  const onRadioClick = (e: RadioChangeEvent) => {
    const { target } = e;

    updateState({
      section: target.value,
    });

    onSectionChange(e);
  };

  useEffect(() => {
    updateState({
      section: workspaceState?.dataSection,
    });
  }, [updateState, workspaceState?.dataSection]);

  const {
    baseMembers: { index: membersIndex },
  } = useAnalyticsQueryMembers({
    selectedQueryMembers,
    settings: queryState?.settings,
  });

  const tableEmptyDesc = emptyDesc || t("data_section.empty_desc");

  const Table = useMemo(() => {
    const messages: ErrorMessage[] = [];

    if (hitLimit) {
      messages.push({
        type: "warning",
        text: `${t("data_section.limit_error_1")} ${limit} ${t(
          "data_section.limit_error_2"
        )}`,
      });
    }

    if (skippedMembers.length) {
      messages.push({
        type: "warning",
        text: `${t("data_section.skipped")} ${skippedMembers.join(", ")}`,
      });
    }

    if (progress?.error) {
      messages.push({
        type: "error",
        text: progress.error,
      });
    }

    if (error) {
      messages.push({
        type: "warning",
        text: "error",
      });
    }

    const loadingTip = progress?.timeElapsed
      ? `${progress?.stage} ${(
          parseFloat(progress?.timeElapsed as unknown as string) / 1000
        ).toFixed(2)} secs...`
      : progress?.stage;

    return (
      <VirtualTable
        sortinMode="server-side"
        tableId={screenshotMode ? "explorationTable" : undefined}
        messages={messages}
        loading={screenshotMode ? false : loading}
        loadingTip={loadingTip}
        width={width}
        height={height}
        columns={columns}
        data={rows}
        sortBy={order}
        cellRenderer={(args) => cellRenderer(args, membersIndex)}
        onSortUpdate={onQueryChange("order") as SortUpdater}
        emptyDesc={tableEmptyDesc}
        settings={settings}
        rowHeight={rowHeight}
        footer={(tableRows) => (
          <div>
            {t("data_section.shown")}: {tableRows.length} / {limit},{" "}
            {t("data_section.offset")}: {offset}, {t("data_section.columns")}:{" "}
            {columns.length}
          </div>
        )}
      />
    );
  }, [
    hitLimit,
    skippedMembers,
    progress,
    error,
    screenshotMode,
    loading,
    width,
    height,
    columns,
    rows,
    order,
    onQueryChange,
    tableEmptyDesc,
    settings,
    rowHeight,
    limit,
    membersIndex,
    t,
    offset,
  ]);

  const Sql = useMemo(() => {
    const { rawSql } = queryState;

    return <PrismCode lang="sql" code={rawSql?.sql || ""} />;
  }, [queryState]);

  const onSubmit = (values: any) => {
    if (values.rows !== limit) {
      onQueryChange("limit", values.rows);
    }
    if (values.offset !== offset) {
      onQueryChange("offset", values.offset);
    }
  };

  return (
    <div data-testid="explore-data-section">
      <div className={s.header}>
        <Row justify={"space-between"} align={"middle"} gutter={[16, 16]}>
          <Col>
            <Space wrap>
              <Button
                className={s.run}
                type="primary"
                onClick={onExec}
                disabled={!queryState?.columns?.length || disabled || loading}
              >
                {t("data_section.run_query")}
                <RightOutlined />
              </Button>
              <div className={s.popoverInner}>
                <ExploreSettingsForm
                  defaultValues={{
                    limit,
                    offset,
                  }}
                  onChange={onSubmit}
                />
              </div>
              <Button
                icon={<AlertIcon />}
                className={s.alertButton}
                type="primary"
                onClick={() => onOpenModal("alert")}
                disabled={disableButtons}
              >
                {t("data_section.create_alert")}
              </Button>
              <Button
                icon={<ReportIcon />}
                className={s.alertButton}
                type="primary"
                onClick={() => onOpenModal("report")}
                disabled={disableButtons}
              >
                {t("data_section.create_report")}
              </Button>
            </Space>
          </Col>

          <Col style={{ justifySelf: "end" }}>
            <Space wrap>
              <CSVLink data={rows} filename={`exploration-${genName(5)}.csv`}>
                <Button className={s.csvBtn} disabled={disableButtons}>
                  {t("data_section.export")} .CSV
                </Button>
              </CSVLink>
            </Space>
          </Col>
        </Row>
      </div>

      <div className={s.radio}>
        <Radio.Group
          value={currState.section}
          onChange={onRadioClick}
          disabled={disableSectionChange}
          className={s.buttonGroup}
        >
          <Radio.Button value="results" type="text" className={s.radioButton}>
            {t("data_section.results")}
          </Radio.Button>
          <Radio.Button value="sql" type="text" className={s.radioButton}>
            {t("data_section.sql")}
          </Radio.Button>
          <Radio.Button value="rest" type="text" className={s.radioButton}>
            {t("data_section.rest_api")}
          </Radio.Button>
        </Radio.Group>
      </div>

      <ComponentSwitcher
        activeItemIndex={currState.section === "sql" ? 1 : 0}
        items={[Table, Sql]}
      />
    </div>
  );
};

export default ExploreDataSection;
