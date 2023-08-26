import {
  useFetchTablesLazyQuery,
  useGenDataSchemasMutation,
  useCreateDataSourceMutation,
  useValidateDataSourceMutation,
  useUpdateDataSourceMutation,
  useCheckConnectionMutation,
  useDeleteDataSourceMutation,
  useInsertSqlCredentialsMutation,
} from "@/graphql/generated";

const role = "user";
export default ({}) => {
  const [execCreateMutation, createMutation] = useCreateDataSourceMutation({
    context: { role },
  });
  const [execUpdateMutation, updateMutation] = useUpdateDataSourceMutation({
    context: { role },
  });
  const [execDeleteMutation, deleteMutation] = useDeleteDataSourceMutation({
    context: { role },
  });
  const [execCheckConnection, checkConnectionMutation] =
    useCheckConnectionMutation({
      context: { role },
    });
  const [execValidateDataSource, validateDataSourceMutation] =
    useValidateDataSourceMutation({
      context: { role },
    });
  const [execGenSchemaMutation, genSchemaMutation] = useGenDataSchemasMutation({
    context: { role },
  });
  const [execInsertSqlCredentialsMutation, insertSqlCredentialsMutation] =
    useInsertSqlCredentialsMutation({
      context: { role },
    });
  const [execFetchTables, fetchTablesQuery] = useFetchTablesLazyQuery({
    context: { role },
  });

  return {
    queries: {
      execFetchTables,
      fetchTablesQuery,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,

      genSchemaMutation,
      execGenSchemaMutation,
      execCheckConnection,
      checkConnectionMutation,
      execValidateDataSource,
      validateDataSourceMutation,
      execInsertSqlCredentialsMutation,
      insertSqlCredentialsMutation,
    },
  };
};
