import { useMemo } from "react";

import type { Maybe } from "@/graphql/generated";
import {
  useCreateDataSourceMutation,
  useDeleteDataSourceMutation,
  useCheckConnectionMutation,
  useGenDataSchemasMutation,
  useRunSourceSqlQueryMutation,
  useValidateDataSourceMutation,
  useUpdateDataSourceMutation,
  useFetchMetaQuery,
  useFetchTablesQuery,
} from "@/graphql/generated";

type Params = {
  editId?: string;
  teamId?: Maybe<string>;
};

interface Props {
  params?: Params;
}

export default ({ params = {} }: Props) => {
  const { editId } = params;

  const [createMutation, execCreateMutation] = useCreateDataSourceMutation();
  const [updateMutation, execUpdateMutation] = useUpdateDataSourceMutation();
  const [deleteMutation, execDeleteMutation] = useDeleteDataSourceMutation();
  const [checkMutation, execCheckMutation] = useCheckConnectionMutation();
  const [genSchemaMutation, execGenSchemaMutation] =
    useGenDataSchemasMutation();
  const [runQueryMutation, execRunQueryMutation] =
    useRunSourceSqlQueryMutation();
  const [validateMutation, execValidateMutation] =
    useValidateDataSourceMutation();

  const [metaData, execQueryMeta] = useFetchMetaQuery({
    pause: true,
    variables: {
      datasource_id: editId,
    },
    requestPolicy: "cache-and-network",
  });

  const currentMeta = useMemo(
    () => metaData.data?.fetch_meta?.cubes || [],
    [metaData.data]
  );

  const [tablesData, execQueryTables] = useFetchTablesQuery({
    variables: { id: editId },
    pause: true,
    requestPolicy: "cache-and-network",
  });

  return {
    currentMeta,
    queries: {
      tablesData,
      execQueryTables,
      metaData,
      execQueryMeta,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
      checkMutation,
      execCheckMutation,

      runQueryMutation,
      execRunQueryMutation,
      validateMutation,
      execValidateMutation,
      genSchemaMutation,
      execGenSchemaMutation,
    },
  };
};
