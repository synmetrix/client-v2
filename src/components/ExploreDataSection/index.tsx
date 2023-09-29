import { Radio } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";
import { useTranslation } from "react-i18next";

import usePermissions from "@/hooks/usePermissions";
import useAnalyticsQueryMembers from "@/hooks/useAnalyticsQueryMembers";
import Button from "@/components/Button";
import PopoverButton from "@/components/PopoverButton";
import SimpleForm from "@/components/SimpleForm";
import VirtualTable, { cellRenderer } from "@/components/VirtualTable";
import PrismCode from "@/components/PrismCode";
import ComponentSwitcher from "@/components/ComponentSwitcher";
import type { SortBySet } from "@/components/VirtualTable";
import type { ErrorMessage } from "@/types/errorMessage";
import type { CubeMember } from "@/types/cube";
import type { SortBy } from "@/types/sort";
import type { LoadingProgress } from "@/types/loading";
import type { QuerySettings } from "@/types/querySettings";

import CSVIcon from "@/assets/csv.svg";

import s from "./index.module.less";

import type { FC, ReactNode } from "react";
import type { RadioChangeEvent } from "antd";

interface ExploreDataSectionProps {
  width: number;
  height: number;
  onToggleSection: (section: string) => void;
  onSectionChange: (radioEvent: RadioChangeEvent) => void;
  onExec: any;
  onQueryChange: (query: string) => (nextSortBy: SortBySet[]) => void;
  disabled: boolean;
  state: { dataSection: string };
  queryState: {
    rows: object[];
    columns: object[];
    settings: QuerySettings;
    loading: boolean;
    progress: LoadingProgress;
    skippedMembers?: string[];
    error?: boolean;
    offset?: number;
    hitLimit?: boolean;
    limit?: number;
    order?: SortBy[];
    rawSql?: { sql: string };
  };
  explorationRowId: string;
  selectedQueryMembers: Record<string, CubeMember[]>;
  isActive: boolean;
  disableSectionChange?: boolean;
  disableSettings?: boolean;
  rowHeight?: number;
  screenshotMode?: boolean;
  emptyDesc?: ReactNode;
  className?: string;
}

const ExploreDataSection: FC<ExploreDataSectionProps> = (props) => {
  const {
    width,
    height,
    onToggleSection,
    onSectionChange,
    onExec,
    onQueryChange,
    disabled,
    state: workspaceState,
    queryState,
    explorationRowId,
    isActive,
    selectedQueryMembers,
    disableSectionChange,
    disableSettings,
    className,
    emptyDesc,
    screenshotMode,
    rowHeight,
    ...restProps
  } = props;

  const { t } = useTranslation();

  const [currState, updateState] = useSetState({
    section: workspaceState.dataSection,
  });

  const formConfig = {
    rows: {
      section: t("Query"),
      label: t("Rows Limit"),
      type: "number",
      defaultValue: 0,
    },
    offset: {
      section: t("Query"),
      label: t("Additional Offset"),
      type: "number",
      defaultValue: 0,
    },
    hideCubeNames: {
      section: t("Settings"),
      label: t("Hide Cube Names"),
      type: "checkbox",
    },
    hideIndexColumn: {
      section: t("Settings"),
      label: t("Hide Index Column"),
      type: "checkbox",
    },
  };

  const onRadioClick = (e: RadioChangeEvent) => {
    const { target } = e;

    updateState({
      section: target.value,
    });

    onSectionChange(e);
  };

  useEffect(() => {
    updateState({
      section: workspaceState.dataSection,
    });
  }, [updateState, workspaceState.dataSection]);

  const { fallback: querySettingsFallback } = usePermissions({
    scope: "explore/workspace/querySettings",
  });
  const {
    baseMembers: { index: membersIndex },
  } = useAnalyticsQueryMembers({
    selectedQueryMembers,
    settings: queryState?.settings,
  });

  const tableEmptyDesc =
    emptyDesc || t("Select dimensions & measures from left menu and run query");

  const Table = useMemo(() => {
    const {
      order,
      hitLimit,
      limit,
      error,
      rows,
      columns,
      loading,
      progress,
      settings,
      skippedMembers = [],
      offset = 0,
    } = queryState;

    const messages: ErrorMessage[] = [];

    if (hitLimit && !querySettingsFallback) {
      messages.push({
        type: "warning",
        text: `You hit the limit. Your dataset is more than ${limit} rows. Try to adjust your query.`,
      });
    }

    if (skippedMembers.length) {
      messages.push({
        type: "warning",
        text: `Skipped ${skippedMembers.join(", ")}`,
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

    return (
      <VirtualTable
        tableId={screenshotMode ? "explorationTable" : undefined}
        messages={messages}
        loading={screenshotMode ? false : loading}
        loadingProgress={progress}
        width={width}
        height={height}
        columns={columns}
        data={rows}
        sortBy={order}
        cellRenderer={(args) => cellRenderer(args, membersIndex)}
        onSortUpdate={onQueryChange("order")}
        emptyDesc={tableEmptyDesc}
        settings={settings}
        rowHeight={rowHeight}
        footer={(tableRows) => (
          <div>
            {t("Shown")}: {tableRows.length} / {limit}, {t("Offset")}: {offset},{" "}
            {t("Columns")}: {columns.length}
          </div>
        )}
      />
    );
  }, [
    queryState,
    querySettingsFallback,
    width,
    height,
    onQueryChange,
    tableEmptyDesc,
    rowHeight,
    membersIndex,
    t,
    screenshotMode,
  ]);

  const Sql = useMemo(() => {
    const { rawSql = { sql: "" } } = queryState;

    return <PrismCode lang="sql" code={rawSql.sql} />;
  }, [queryState]);

  return (
    <>
      <div className={s.header}>
        <div>
          <Button
            className={s.dataBtn}
            type="dashed"
            onClick={() => onToggleSection("dataSec")}
          >
            {t("Data")}
          </Button>

          <Radio.Group
            value={currState.section}
            onChange={onRadioClick}
            disabled={disableSectionChange}
            className={s.buttonGroup}
          >
            <Radio.Button value="results">{t("Results")}</Radio.Button>
            <Radio.Button value="sql">{t("SQL")}</Radio.Button>
          </Radio.Group>

          <div style={{ display: "inline-block", marginLeft: 10 }}>
            <PopoverButton
              icon={<SettingOutlined />}
              style={{
                borderColor: "transparent",
                boxShadow: "none",
                color: "rgba(0, 0, 0, 0.25)",
              }}
              placement="bottom"
              buttonProps={{
                size: "middle",
              }}
              content={
                <div className={s.popoverInner}>
                  <SimpleForm
                    layout="vertical"
                    config={formConfig}
                    onSubmit={console.log}
                    autoSubmit
                  />
                </div>
              }
              trigger="click"
            />
          </div>
        </div>

        <div>
          <Button className={s.csvBtn}>
            <div className={s.csvText}>Export .CSV</div>{" "}
            <CSVIcon className={s.csvIcon} />
          </Button>

          <Button type="primary">+ New</Button>
        </div>
      </div>

      <div>
        <ComponentSwitcher
          activeItemIndex={currState.section === "sql" ? 1 : 0}
          items={[Table, Sql]}
        />
      </div>
    </>
  );
};

export default ExploreDataSection;
