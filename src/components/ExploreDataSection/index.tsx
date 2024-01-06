import { Col, Radio, Row, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useSetState } from "ahooks";
import { useTranslation } from "react-i18next";

import useAnalyticsQueryMembers from "@/hooks/useAnalyticsQueryMembers";
import Button from "@/components/Button";
import VirtualTable, { cellRenderer } from "@/components/VirtualTable";
import PrismCode from "@/components/PrismCode";
import ComponentSwitcher from "@/components/ComponentSwitcher";
import RestAPI from "@/components/RestAPI";
import genName from "@/utils/helpers/genName";
import type { DataSchemaFormValues } from "@/components/ExploreSettingsForm";
import ExploreSettingsForm from "@/components/ExploreSettingsForm";
import type { ExploreWorkspaceState } from "@/hooks/useExploreWorkspace";
import type { SortBySet } from "@/components/VirtualTable";
import type { ErrorMessage } from "@/types/errorMessage";
import type { CubeMember } from "@/types/cube";
import type { ExplorationState } from "@/types/exploration";
import EmptyExploration from "@/components/EmptyExploration";
import membersToCubeQuery from "@/utils/helpers/membersToCubeQuery";
import type { Branch, DataSourceInfo } from "@/types/dataSource";

import AlertIcon from "@/assets/alert.svg";
import ReportIcon from "@/assets/report.svg";

import s from "./index.module.less";

import type { CollapsePanelProps, RadioChangeEvent } from "antd";
import type { FC, ReactNode } from "react";

type SortUpdater = (nextSortBy: SortBySet[]) => void;

interface ExploreDataSectionProps extends Omit<CollapsePanelProps, "header"> {
  width?: number;
  height?: number;
  onToggleSection: (section: string) => void;
  onSectionChange: (value: string) => void;
  onOpenModal: (type: string) => void;
  onExec: any;
  onQueryChange: (query: string, ...args: any) => void | SortUpdater;
  disabled: boolean;
  dataSource?: DataSourceInfo;
  currentBranch?: Branch;
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

const ExploreDataSection: FC<ExploreDataSectionProps> = (props) => {
  const {
    width,
    height,
    dataSource,
    currentBranch,
    onSectionChange = () => {},
    onOpenModal = () => {},
    onExec = () => {},
    onQueryChange = () => {},
    state: workspaceState,
    queryState,
    selectedQueryMembers,
    disableSectionChange,
    screenshotMode,
    rowHeight,
    disabled,
    loading = false,
    disableButtons,
  } = props;
  const { t } = useTranslation(["explore", "common"]);

  const [currState, updateState] = useSetState({
    section: workspaceState?.dataSection || "sql",
  });

  // const formConfig = {
  //   rows: {
  //     label: t("data_section.rows_limit"),
  //     type: "number",
  //     defaultValue: 1000,
  //     min: 1,
  //     max: MAX_ROWS_LIMIT,
  //     rules: {
  //       validate: (val: number) =>
  //         !isNaN(val) && val > 0 && val <= MAX_ROWS_LIMIT,
  //     },
  //   },
  //   offset: {
  //     label: t("data_section.additional_offset"),
  //     type: "number",
  //     min: 0,
  //     defaultValue: 0,
  //     rules: {
  //       validate: (val: number) => !isNaN(val) && val >= 0,
  //     },
  //   },
  // };

  const {
    order,
    hitLimit,
    limit = 1000,
    error,
    rows,
    columns,
    progress,
    settings,
    skippedMembers = [],
    offset = 0,
    // settings: { hideCubeNames, hideIndexColumn },
  } = queryState;

  const onRadioClick = (e: RadioChangeEvent) => {
    const {
      target: { value },
    } = e;

    updateState({
      section: value,
    });

    onSectionChange(value as string);
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
        emptyComponent={<EmptyExploration />}
        className={s.table}
        settings={settings}
        rowHeight={rowHeight}
        footer={(tableRows) => (
          <div className={s.tableFooter}>
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
    settings,
    rowHeight,
    limit,
    membersIndex,
    t,
    offset,
  ]);

  const Sql = useMemo(() => {
    const { rawSql } = queryState;

    if (!rawSql?.sql) {
      return <EmptyExploration />;
    }

    return (
      <>
        <span className={s.sqlHeader}>{t("SQL")}</span>
        <PrismCode
          lang="sql"
          code={rawSql?.sql || ""}
          style={{ minHeight: 400 }}
        />
      </>
    );
  }, [queryState, t]);

  const RestApi = useMemo(() => {
    if (dataSource?.id && currentBranch?.id) {
      return (
        <RestAPI
          dataSourceId={dataSource.id}
          branchId={currentBranch.id}
          query={membersToCubeQuery(selectedQueryMembers)}
          limit={queryState?.limit}
          offset={queryState?.offset}
        />
      );
    }
  }, [
    currentBranch?.id,
    dataSource?.id,
    queryState?.limit,
    queryState?.offset,
    selectedQueryMembers,
  ]);

  const onChange = (values: Partial<DataSchemaFormValues>) => {
    if (values.limit !== limit) {
      onQueryChange("limit", values.limit);
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
              <ExploreSettingsForm
                defaultValues={{
                  limit,
                  offset,
                }}
                onChange={onChange}
              />
              <Button
                icon={<AlertIcon />}
                className={s.alertButton}
                type="default"
                onClick={() => onOpenModal("alert")}
                disabled={disableButtons}
              >
                {t("data_section.create_alert")}
              </Button>
              <Button
                icon={<ReportIcon />}
                className={s.alertButton}
                type="default"
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

      <div className={s.wrapper}>
        <ComponentSwitcher
          activeItemIndex={["results", "sql", "rest"].findIndex(
            (sec) => sec === currState.section
          )}
          items={[Table, Sql, RestApi]}
        />
      </div>
    </div>
  );
};

export default ExploreDataSection;
