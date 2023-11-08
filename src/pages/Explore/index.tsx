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
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import trackEvent from "@/utils/helpers/trackEvent";
import type { DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import useAnalyticsQuery from "@/hooks/useAnalyticsQuery";
import useCheckResponse from "@/hooks/useCheckResponse";
import useAppSettings from "@/hooks/useAppSettings";
import type {
  Exploration,
  RawSql,
  DataSchemaValidation,
} from "@/types/exploration";

interface ExploreProps {
  loading?: boolean;
  dataSources?: DataSourceInfo[];
  dataSource?: DataSourceInfo;
  exploration?: Exploration;
  meta: Record<string, any>[];
  dataSet?: FetchDatasetOutput;
  rawSql?: RawSql;
  metaLoading?: boolean;
  explorationId?: string;
  dataSchemaValidation?: DataSchemaValidation;
  runQuery?: (state: object, settings: QuerySettings) => void;
  onSelectDataSource?: (id: string) => void;
  params: {
    screenshotMode: boolean;
  };
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
  runQuery = () => {},
  onSelectDataSource = () => {},
}: ExploreProps) => {
  const header = () => (
    <DataSourcesMenu
      selectedId={dataSource?.id as string}
      entities={(dataSources || []).map((d) => ({
        id: d.id as string,
        name: d.name,
      }))}
      onChange={onSelectDataSource}
    />
  );

  return (
    <ExploreWorkspace
      header={header()}
      rawSql={rawSql}
      exploration={exploration}
      params={params}
      runQuery={runQuery}
      source={dataSource}
      dataSources={dataSources}
      dataSchemaValidation={dataSchemaValidation}
      meta={meta}
      metaLoading={metaLoading}
      dataSet={dataSet}
      loading={loading}
    />
  );
};

const ExploreWrapper = () => {
  const { t } = useTranslation(["explore"]);
  const { currentUser } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { screenshotMode } = location.query;
  const { dataSourceId, explorationId } = useParams();

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

  const dataSourcePath = `/explore/${dataSourceId}`;
  useCheckResponse(
    currentExploration,
    (res, err) => {
      if (!res?.explorations_by_pk || err) {
        message.error(t("errors.exploration_not_found"));
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

  useEffect(() => {
    const newExplortionId = createData.data?.insert_explorations_one?.id;
    if (newExplortionId) {
      delete createData.data;
      setLocation(withAuthPrefix(`${dataSourcePath}/${newExplortionId}`));
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
  const exploration = useMemo(
    () => currentExploration?.data?.explorations_by_pk as Exploration,
    [currentExploration.data?.explorations_by_pk]
  );
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
        message.error(t("errors.data_source_not_found"));
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
      dataSources={datasources}
      dataSource={curSource}
      exploration={exploration}
      rawSql={rawSql}
      dataSet={dataSet}
      runQuery={runQuery}
      dataSchemaValidation={dataSchemaValidation}
      onSelectDataSource={onSelectDataSource}
      params={{
        screenshotMode: isScreenshotMode,
      }}
    />
  );
};

export default ExploreWrapper;
