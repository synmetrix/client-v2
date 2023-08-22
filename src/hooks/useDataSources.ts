import {
  useFetchTablesLazyQuery,
  useGenDataSchemasMutation,
  useCreateDataSourceMutation,
  useValidateDataSourceMutation,
  useUpdateDataSourceMutation,
  useCheckConnectionMutation,
  useDeleteDataSourceMutation,
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
    useCheckConnectionMutation({ context: { role } });
  const [execValidateDataSource, validateDataSourceMutation] =
    useValidateDataSourceMutation({ context: { role } });
  const [execFetchTables, fetchTablesQuery] = useFetchTablesLazyQuery({
    context: { role },
  });
  const [execGenSchemaMutation, genSchemaMutation] = useGenDataSchemasMutation({
    context: { role },
  });

  return {
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,

      execFetchTables,
      fetchTablesQuery,
      genSchemaMutation,
      execGenSchemaMutation,
      execCheckConnection,
      checkConnectionMutation,
      execValidateDataSource,
      validateDataSourceMutation,
    },
  };
};
