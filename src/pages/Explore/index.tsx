import { useEffect, useMemo } from "react";
import { useParams } from "@vitjs/runtime";

import type { Explorations, FetchDatasetOutput } from "@/graphql/generated";
import {
  useFetchMetaQuery,
  useCurrentExplorationQuery,
  useGenSqlMutation,
  useValidateDataSourceMutation,
  useCreateExplorationMutation,
} from "@/graphql/generated";
import ExploreWorkspace from "@/components/ExploreWorkspace";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import trackEvent from "@/utils/helpers/trackEvent";
import type { DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import useAnalyticsQuery from "@/hooks/useAnalyticsQuery";
import type {
  Exploration,
  RawSql,
  DataSchemaValidation,
} from "@/types/exploration";
import DataSourcesMenu from "@/components/DataSourcesMenu";

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

const prepareExplorationData = (
  exp: Explorations | undefined
): Exploration | undefined => {
  if (!exp) return;

  return {
    id: exp.id,
    datasourceId: exp.datasource_id,
    playgroundSettings: exp.playground_settings,
    playgroundState: exp.playground_state,
    createdAt: exp.created_at,
    updatedAt: exp.updated_at,
  };
};

const ExploreWrapper = () => {
  const { currentUser } = CurrentUserStore();
  const [location, setLocation] = useLocation();
  const { screenshotMode } = location.query;
  const { dataSourceId, explorationId } = useParams();

  const { state: playgroundState } = useAnalyticsQuery();
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

  const onSelectDataSource = (id: string) => {
    setLocation(`/explore/${id}`);
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
      setLocation(`/explore/${dataSourceId}/${newExplortionId}`);
    }
  }, [
    createData.data,
    createData.data?.insert_explorations_one?.id,
    dataSourceId,
    setLocation,
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
    () =>
      prepareExplorationData(
        currentExploration?.data?.explorations_by_pk as Explorations
      ),
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
    if (datasources.length && ((dataSourceId && !curSource) || !dataSourceId)) {
      setLocation(`/explore/${datasources?.[0]?.id}`);
    }
  }, [curSource, dataSourceId, datasources, setLocation]);

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
