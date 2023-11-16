import { useEffect, useMemo } from "react";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";
import { message } from "antd";

import type { FetchDatasetOutput } from "@/graphql/generated";
import {
  useFetchMetaQuery,
  useCurrentExplorationQuery,
  useGenSqlMutation,
  useValidateDataSourceMutation,
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
import useReports from "@/hooks/useReports";
import useAlerts from "@/hooks/useAlerts";
import type {
  Exploration,
  RawSql,
  DataSchemaValidation,
} from "@/types/exploration";
import type { AlertFormType, AlertType } from "@/types/alert";
import type { ReportFormType } from "@/types/report";

export interface Params {
  screenshotMode: boolean;
  modalType?: string;
  delivery?: AlertType;
}

interface ExploreProps {
  loading?: boolean;
  dataSources?: DataSourceInfo[];
  dataSource?: DataSourceInfo;
  exploration?: Exploration;
  meta: Record<string, any>[];
  dataSet?: FetchDatasetOutput;
  rawSql?: RawSql;
  metaLoading?: boolean;
  testLoading?: boolean;
  dataSchemaValidation?: DataSchemaValidation;
  onOpenModal?: (type: string) => void;
  onCloseModal?: () => void;
  onChangeStep?: (step: number) => void;
  onSelectDelivery?: (del: string) => void;
  runQuery?: (state: object, settings: QuerySettings) => void;
  onSelectDataSource?: (id: string) => void;
  onCreateAlert?: (values: AlertFormType) => void;
  onSendTest?: (values: AlertFormType | ReportFormType) => void;
  onCreateReport?: (values: ReportFormType) => void;
  params: Params;
}

export const Explore = ({
  loading = false,
  meta = [],
  metaLoading = false,
  dataSource,
  dataSources = [],
  exploration,
  rawSql,
  dataSet,
  dataSchemaValidation,
  params,
  testLoading = false,
  onChangeStep = () => {},
  onOpenModal = () => {},
  onCloseModal = () => {},
  onSelectDelivery = () => {},
  runQuery = () => {},
  onSelectDataSource = () => {},
  onCreateAlert = () => {},
  onSendTest = () => {},
  onCreateReport = () => {},
}: ExploreProps) => {
  const { modalType } = params;

  const query = useMemo(
    () => exploration?.playground_state || {},
    [exploration?.playground_state]
  );

  const header = useMemo(
    () => (
      <DataSourcesMenu
        selectedId={dataSource?.id as string}
        entities={(dataSources || []).map((d) => ({
          id: d.id as string,
          name: d.name,
        }))}
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
        rawSql={rawSql}
        exploration={exploration}
        params={params}
        runQuery={runQuery}
        onOpenModal={onOpenModal}
        source={dataSource}
        dataSources={dataSources}
        dataSchemaValidation={dataSchemaValidation}
        meta={meta}
        metaLoading={metaLoading}
        dataSet={dataSet}
        loading={loading}
      />

      <AlertModal
        isOpen={isAlertOpen}
        onClose={onCloseModal}
        query={query}
        onChangeStep={onChangeStep}
        onSelectDelivery={onSelectDelivery}
        onSendTest={onSendTest}
        onSubmit={onCreateAlert}
        loading={testLoading}
        params={params}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={onCloseModal}
        query={query}
        onChangeStep={onChangeStep}
        onSelectDelivery={onSelectDelivery}
        onSendTest={onSendTest}
        onSubmit={onCreateReport}
        loading={testLoading}
        params={params}
      />
    </>
  );
};

const ExploreWrapper = () => {
  const { t } = useTranslation(["explore", "alerts", "reports"]);
  const { currentUser } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { screenshotMode } = location.query;
  const { dataSourceId, explorationId, modalType, delivery } = useParams();

  const { state: playgroundState } = useAnalyticsQuery();
  const { withAuthPrefix } = useAppSettings();
  const [createData, execCreateMutation] = useCreateExplorationMutation();
  const [validateData, execValidateMutation] = useValidateDataSourceMutation();
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

  const {
    createAlert,
    onSendTest,
    mutations: {
      createMutationData: createAlertMutationData,
      sendTestMutationData,
    },
  } = useAlerts({
    explorationId,
  });

  const {
    createReport,
    mutations: { createMutationData: createReportMutationData },
  } = useReports({
    explorationId,
  });

  const dataSourcePath = `/explore/${dataSourceId}`;
  const explorePath = `${dataSourcePath}/${explorationId}`;
  useCheckResponse(
    createAlertMutationData,
    () => {
      setLocation(explorePath);
    },
    {
      successMessage: t("alerts:alert_created"),
    }
  );

  useCheckResponse(
    createReportMutationData,
    () => {
      setLocation(explorePath);
    },
    {
      successMessage: t("reports:report_created"),
    }
  );

  useCheckResponse(sendTestMutationData, () => {}, {
    successMessage: t("alerts:test_alert_sent"),
  });

  const datasources = useMemo(
    () => currentUser.dataSources || [],
    [currentUser]
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

  const onSelectDataSource = (id: string) => {
    setLocation(withAuthPrefix(`/explore/${id}`));
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
    if (dataSourceId) {
      execValidateMutation({ id: dataSourceId });
    }
  }, [dataSourceId, execValidateMutation]);

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
  const exploration = useMemo(() => {
    if (explorationId && currentExploration?.data) {
      return currentExploration?.data?.explorations_by_pk as Exploration;
    }
  }, [currentExploration?.data, explorationId]);
  const dataSet = useMemo(
    () => currentExploration.data?.fetch_dataset as FetchDatasetOutput,
    [currentExploration.data?.fetch_dataset]
  );
  const rawSql = useMemo(
    () => sqlData.data?.gen_sql?.result || {},
    [sqlData.data?.gen_sql?.result]
  );
  const dataSchemaValidation = useMemo(
    () => validateData.data?.validate_datasource as DataSchemaValidation,
    [validateData.data?.validate_datasource]
  );
  const currentProgress = useMemo(() => dataSet?.progress || {}, [dataSet]);

  useEffect(() => {
    if (currentProgress && currentProgress.loading) {
      execCurrentExploration();
    }
  }, [currentProgress, execCurrentExploration]);

  useEffect(() => {
    const noCurSource = dataSourceId && !curSource;
    if (datasources.length && (noCurSource || !dataSourceId)) {
      if (noCurSource) {
        message.error(t("explore:errors.data_source_not_found"));
      }

      setLocation(withAuthPrefix(`/explore/${datasources?.[0]?.id}`));
    }
  }, [curSource, dataSourceId, datasources, setLocation, t, withAuthPrefix]);

  const loading =
    currentExploration.fetching ||
    validateData.fetching ||
    createData.fetching ||
    sqlData.fetching;

  const isScreenshotMode = screenshotMode !== undefined;

  return (
    <Explore
      loading={loading}
      meta={metaData?.data?.fetch_meta?.cubes || []}
      metaLoading={metaData.fetching}
      testLoading={sendTestMutationData.fetching}
      dataSources={datasources}
      dataSource={curSource}
      exploration={exploration}
      rawSql={rawSql}
      dataSet={dataSet}
      runQuery={runQuery}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      onChangeStep={onChangeStep}
      onSelectDelivery={onSelectDelivery}
      dataSchemaValidation={dataSchemaValidation}
      onSelectDataSource={onSelectDataSource}
      onCreateAlert={createAlert}
      onSendTest={onSendTest}
      onCreateReport={createReport}
      params={{
        screenshotMode: isScreenshotMode,
        modalType: modalType?.toLowerCase(),
        delivery: delivery?.toUpperCase() as AlertType,
      }}
    />
  );
};

export default ExploreWrapper;
