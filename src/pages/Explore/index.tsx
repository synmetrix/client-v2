import { useEffect, useMemo } from "react";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";
import { Space, message } from "antd";
import { useLocalStorageState, useTrackedEffect } from "ahooks";

import type { FetchDatasetOutput } from "@/graphql/generated";
import {
  useFetchMetaQuery,
  useCurrentExplorationQuery,
  useGenSqlMutation,
  useCreateExplorationMutation,
  Branch_Statuses_Enum,
} from "@/graphql/generated";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import ExploreWorkspace from "@/components/ExploreWorkspace";
import AlertModal from "@/components/AlertModal";
import ReportModal from "@/components/ReportModal";
import BranchSelection from "@/components/BranchSelection";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import trackEvent from "@/utils/helpers/trackEvent";
import type { Branch, DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import useAnalyticsQuery, { initialState } from "@/hooks/useAnalyticsQuery";
import useCheckResponse from "@/hooks/useCheckResponse";
import type { Exploration, ExplorationData, RawSql } from "@/types/exploration";
import type { AlertType } from "@/types/alert";
import type { Meta } from "@/types/cube";
import { EXPLORE } from "@/utils/constants/paths";

import ExploreIcon from "@/assets/explore-active.svg";

import styles from "./index.module.less";

export interface Params {
  modalType?: string;
  delivery?: AlertType;
}

interface ExploreProps {
  loading?: boolean;
  dataSources?: DataSourceInfo[];
  dataSource?: DataSourceInfo;
  explorationData?: ExplorationData;
  rawSql?: RawSql;
  meta: Meta;
  branches: Branch[];
  currentBranch?: Branch;
  onOpenModal?: (type: string) => void;
  onCloseModal?: () => void;
  onChangeStep?: (step: number) => void;
  onSelectDelivery?: (del: string) => void;
  runQuery?: (state: object, settings: QuerySettings) => void;
  onSelectDataSource?: (dataSource: DataSourceInfo | null) => void;
  onChangeBranch?: (id: string) => void;
  params: Params;
}

export const Explore = ({
  loading = false,
  dataSource,
  dataSources = [],
  explorationData,
  rawSql,
  params,
  meta,
  branches,
  currentBranch,
  onChangeStep = () => {},
  onOpenModal = () => {},
  onCloseModal = () => {},
  onSelectDelivery = () => {},
  runQuery = () => {},
  onSelectDataSource = () => {},
  onChangeBranch = () => {},
}: ExploreProps) => {
  const { t } = useTranslation();
  const { modalType } = params;

  const header = useMemo(
    () => (
      <Space className={styles.wrapper} size={12} direction="vertical">
        <DataSourcesMenu
          selectedId={dataSource?.id as string}
          entities={dataSources || []}
          onChange={onSelectDataSource}
        />
        <BranchSelection
          branches={branches}
          currentBranch={currentBranch}
          onChangeBranch={onChangeBranch}
          disableActions
        />
      </Space>
    ),
    [
      branches,
      currentBranch,
      dataSource?.id,
      dataSources,
      onChangeBranch,
      onSelectDataSource,
    ]
  );

  const isAlertOpen = modalType === "alert";
  const isReportOpen = modalType === "report";

  return (
    <>
      <ExploreWorkspace
        header={header}
        subTitle={t("pages:explore")}
        icon={<ExploreIcon />}
        rawSql={rawSql}
        explorationData={explorationData}
        runQuery={runQuery}
        onOpenModal={onOpenModal}
        currentBranch={currentBranch}
        source={dataSource}
        dataSources={dataSources}
        meta={meta}
        loading={loading}
      />

      <AlertModal
        exploration={explorationData?.exploration}
        isOpen={isAlertOpen}
        onClose={onCloseModal}
        onChangeStep={onChangeStep}
        onSelectDelivery={onSelectDelivery}
        params={params}
      />

      <ReportModal
        exploration={explorationData?.exploration}
        isOpen={isReportOpen}
        onClose={onCloseModal}
        onChangeStep={onChangeStep}
        onSelectDelivery={onSelectDelivery}
        params={params}
      />
    </>
  );
};

const ExploreWrapper = () => {
  const { t } = useTranslation(["explore", "alerts", "reports"]);
  const { teamData } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { branchId } = location.query;

  const [currentDataSourceId, setCurrentDataSourceId] = useLocalStorageState(
    "currentDataSourceId"
  );
  const [currentBranchId, setCurrentBranchId] = useLocalStorageState<string>(
    `${currentDataSourceId}:exploreCurrentBranch`
  );

  const { dataSourceId, explorationId, modalType, delivery } = useParams();

  const { state: playgroundState, doReset } = useAnalyticsQuery();
  const [createData, execCreateMutation] = useCreateExplorationMutation();
  const [sqlData, execSqlGenMutation] = useGenSqlMutation();
  const [currentExploration, execCurrentExploration] =
    useCurrentExplorationQuery({
      variables: {
        id: explorationId,
        limit: playgroundState.limit,
        offset: playgroundState.offset,
      },
      pause: true,
    });

  const dataSourcePath = `${EXPLORE}/${dataSourceId}`;
  const explorePath = `${dataSourcePath}/${explorationId}`;

  const datasources = useMemo(
    () => teamData?.dataSources || [],
    [teamData]
  ) as DataSourceInfo[];

  const [curSource, currentBranch] = useMemo(() => {
    const source =
      (datasources || []).find((d) => d.id === currentDataSourceId) ||
      datasources?.[0];

    const branch =
      (source?.branches || []).find((b) => b.id === currentBranchId) ||
      (source?.branches || []).find(
        (b) => b.status === Branch_Statuses_Enum.Active
      );

    return [source, branch];
  }, [currentBranchId, currentDataSourceId, datasources]);

  const [metaData, execMetaQuery] = useFetchMetaQuery({
    variables: {
      datasource_id: curSource?.id,
      branch_id: currentBranch?.id,
    },
    pause: true,
  });

  useCheckResponse(
    currentExploration,
    (res, err) => {
      if (!res?.explorations_by_pk || err) {
        message.error(t("explore:errors.exploration_not_found"));
        setLocation(dataSourcePath);
      }
    },
    {
      successMessage: "",
      errorMessage: "",
    }
  );

  const onSelectDataSource = (dataSource: DataSourceInfo | null) => {
    setCurrentDataSourceId(dataSource?.id);
    setLocation(`${EXPLORE}/${dataSource?.id}`);
  };

  const runQuery = (explorationQueryState: any, settings: any) => {
    trackEvent("Run Query");

    const newExplorationObj = {
      branch_id: currentBranch?.id,
      datasource_id: dataSourceId,
      playground_state: explorationQueryState,
      playground_settings: settings,
    };

    return execCreateMutation({ object: newExplorationObj });
  };

  const onOpenModal = (type: string) => {
    setLocation(`${explorePath}/${type}`);
  };

  const onCloseModal = () => {
    setLocation(`${explorePath}`);
  };

  const onSelectDelivery = (del: string) => {
    setLocation(`${explorePath}/${modalType}/${del.toLowerCase()}`);
  };

  const onChangeStep = (step: number) => {
    if (step === 1) {
      setLocation(`${explorePath}/${modalType}`);
    }
  };

  const onChangeBranch = (id: string) => {
    setCurrentBranchId(id);
    setLocation(dataSourcePath);
  };

  useEffect(() => {
    if (branchId) {
      setCurrentBranchId(branchId);
      setLocation(dataSourcePath);
    }
  }, [
    branchId,
    currentBranchId,
    dataSourcePath,
    setCurrentBranchId,
    setLocation,
  ]);

  useEffect(() => {
    const newExplorationId = createData.data?.insert_explorations_one?.id;
    if (newExplorationId) {
      delete createData.data;
      setLocation(`${dataSourcePath}/${newExplorationId}`);
    }
  }, [createData.data, dataSourcePath, setLocation]);

  useTrackedEffect(() => {
    if (curSource?.id && currentBranch?.id) {
      execMetaQuery();
      doReset(initialState);
      delete currentExploration.data;
    }
  }, [curSource?.id, currentBranch?.id]);

  useEffect(() => {
    if (explorationId) {
      execCurrentExploration();
      execSqlGenMutation({
        exploration_id: explorationId,
      });
    }
  }, [execCurrentExploration, execSqlGenMutation, explorationId]);

  const explorationData: ExplorationData | undefined = useMemo(() => {
    if (explorationId && currentExploration?.data) {
      return {
        exploration: currentExploration?.data
          ?.explorations_by_pk as Exploration,
        dataset: currentExploration.data?.fetch_dataset as FetchDatasetOutput,
      };
    }
  }, [currentExploration?.data, explorationId]);

  const rawSql = useMemo(
    () => sqlData.data?.gen_sql?.result || {},
    [sqlData.data?.gen_sql?.result]
  );

  useEffect(() => {
    if (
      explorationData?.dataset &&
      explorationData?.dataset?.progress?.loading
    ) {
      execCurrentExploration();
    }
  }, [explorationData?.dataset, execCurrentExploration]);

  useEffect(() => {
    const explorationBranch = explorationData?.exploration?.branch_id;
    if (explorationBranch && explorationBranch !== currentBranchId) {
      setCurrentBranchId(explorationBranch);
    }
  }, [
    currentBranchId,
    explorationData?.exploration?.branch_id,
    setCurrentBranchId,
  ]);

  useLayoutEffect(() => {
    const noCurSource = dataSourceId && !curSource;
    if (datasources.length && (noCurSource || !dataSourceId)) {
      if (noCurSource) {
        message.error(t("explore:errors.data_source_not_found"));
      }

      const isExist = teamData?.dataSources?.find(
        (d) => d.id === currentDataSourceId
      );

      if (isExist) {
        setLocation(`${EXPLORE}/${currentDataSourceId}`);
      } else {
        setLocation(`${EXPLORE}/${datasources?.[0]?.id}`);
        setCurrentDataSourceId(datasources?.[0]?.id);
      }
    } else if (!datasources?.length && dataSourceId) {
      setLocation(EXPLORE);
    }
  }, [
    curSource,
    currentDataSourceId,
    dataSourceId,
    datasources,
    setCurrentDataSourceId,
    setLocation,
    t,
    teamData?.dataSources,
  ]);

  const meta = {
    data: metaData?.data?.fetch_meta?.cubes || [],
    error: metaData?.error?.message,
    loading: metaData?.fetching,
  } as Meta;

  const loading =
    currentExploration.fetching || createData.fetching || sqlData.fetching;

  return (
    <Explore
      loading={loading}
      meta={meta}
      dataSources={datasources}
      dataSource={curSource}
      explorationData={explorationData}
      rawSql={rawSql}
      runQuery={runQuery}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onChangeStep={onChangeStep}
      onSelectDelivery={onSelectDelivery}
      onSelectDataSource={onSelectDataSource}
      branches={curSource?.branches || []}
      onChangeBranch={onChangeBranch}
      currentBranch={currentBranch}
      params={{
        modalType: modalType?.toLowerCase(),
        delivery: delivery?.toUpperCase() as AlertType,
      }}
    />
  );
};

export default ExploreWrapper;
