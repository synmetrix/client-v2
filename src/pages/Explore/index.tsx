import { useEffect, useMemo } from "react";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useLocalStorageState } from "ahooks";

import type { FetchDatasetOutput } from "@/graphql/generated";
import {
  useFetchMetaQuery,
  useCurrentExplorationQuery,
  useGenSqlMutation,
  useCreateExplorationMutation,
} from "@/graphql/generated";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import ExploreWorkspace from "@/components/ExploreWorkspace";
import AlertModal from "@/components/AlertModal";
import ReportModal from "@/components/ReportModal";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import trackEvent from "@/utils/helpers/trackEvent";
import type { DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import useAnalyticsQuery from "@/hooks/useAnalyticsQuery";
import useCheckResponse from "@/hooks/useCheckResponse";
import useAppSettings from "@/hooks/useAppSettings";
import type { Exploration, ExplorationData, RawSql } from "@/types/exploration";
import type { AlertType } from "@/types/alert";
import type { Meta } from "@/types/cube";

import ExploreIcon from "@/assets/explore-active.svg";

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
  onOpenModal?: (type: string) => void;
  onCloseModal?: () => void;
  onChangeStep?: (step: number) => void;
  onSelectDelivery?: (del: string) => void;
  runQuery?: (state: object, settings: QuerySettings) => void;
  onSelectDataSource?: (dataSource: DataSourceInfo | null) => void;
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
  onChangeStep = () => {},
  onOpenModal = () => {},
  onCloseModal = () => {},
  onSelectDelivery = () => {},
  runQuery = () => {},
  onSelectDataSource = () => {},
}: ExploreProps) => {
  const { t } = useTranslation();
  const { modalType } = params;

  const header = useMemo(
    () => (
      <DataSourcesMenu
        selectedId={dataSource?.id as string}
        entities={dataSources || []}
        onChange={onSelectDataSource}
      />
    ),
    [dataSource?.id, dataSources, onSelectDataSource]
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
  const [, setLocation] = useLocation();
  const [currentDataSourceId, setCurrentDataSourceId] = useLocalStorageState(
    "currentDataSourceId"
  );
  const { dataSourceId, explorationId, modalType, delivery } = useParams();

  const { state: playgroundState } = useAnalyticsQuery();
  const { withAuthPrefix } = useAppSettings();
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

  const dataSourcePath = `/explore/${dataSourceId}`;
  const explorePath = `${dataSourcePath}/${explorationId}`;

  const datasources = useMemo(
    () => teamData?.dataSources || [],
    [teamData]
  ) as DataSourceInfo[];

  const [metaData, execMetaQuery] = useFetchMetaQuery({
    variables: {
      datasource_id: dataSourceId,
    },
    pause: true,
  });

  useCheckResponse(
    currentExploration,
    (res, err) => {
      if (!res?.explorations_by_pk || err) {
        message.error(t("explore:errors.exploration_not_found"));
        setLocation(withAuthPrefix(dataSourcePath));
      }
    },
    {
      successMessage: "",
      errorMessage: "",
    }
  );

  const onSelectDataSource = (dataSource: DataSourceInfo | null) => {
    setCurrentDataSourceId(dataSource?.id);
    setLocation(withAuthPrefix(`/explore/${dataSource?.id}`));
  };

  const runQuery = (explorationQueryState: any, settings: any) => {
    trackEvent("Run Query");

    const newExplorationObj = {
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

  useEffect(() => {
    const newExplorationId = createData.data?.insert_explorations_one?.id;
    if (newExplorationId) {
      delete createData.data;
      setLocation(withAuthPrefix(`${dataSourcePath}/${newExplorationId}`));
    }
  }, [
    createData.data,
    createData.data?.insert_explorations_one?.id,
    dataSourcePath,
    setLocation,
    withAuthPrefix,
  ]);

  useEffect(() => {
    if (dataSourceId) {
      execMetaQuery();
    }
  }, [dataSourceId, execMetaQuery]);

  useEffect(() => {
    if (explorationId) {
      execSqlGenMutation({
        exploration_id: explorationId,
      });
    }
  }, [execSqlGenMutation, explorationId]);

  useEffect(() => {
    if (explorationId) {
      execCurrentExploration();
    }
  }, [execCurrentExploration, explorationId]);

  const curSource = useMemo(
    () => (datasources || []).find((d) => d.id === dataSourceId),
    [dataSourceId, datasources]
  );
  const explorationData: ExplorationData | undefined = useMemo(() => {
    if (explorationId && currentExploration?.data) {
      return {
        exploration: currentExploration?.data
          ?.explorations_by_pk as Exploration,
        dataSet: currentExploration.data?.fetch_dataset as FetchDatasetOutput,
      };
    }
  }, [currentExploration?.data, explorationId]);
  const rawSql = useMemo(
    () => sqlData.data?.gen_sql?.result || {},
    [sqlData.data?.gen_sql?.result]
  );

  useEffect(() => {
    if (
      explorationData?.dataSet &&
      explorationData?.dataSet?.progress.loading
    ) {
      execCurrentExploration();
    }
  }, [explorationData?.dataSet, execCurrentExploration]);

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
        setLocation(withAuthPrefix(`/explore/${currentDataSourceId}`));
      } else {
        setLocation(withAuthPrefix(`/explore/${datasources?.[0]?.id}`));
        setCurrentDataSourceId(datasources?.[0]?.id);
      }
    } else if (!datasources?.length && dataSourceId) {
      setLocation("/explore");
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
    withAuthPrefix,
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
      params={{
        modalType: modalType?.toLowerCase(),
        delivery: delivery?.toUpperCase() as AlertType,
      }}
    />
  );
};

export default ExploreWrapper;
