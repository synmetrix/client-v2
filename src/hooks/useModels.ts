import {
  useDeleteSchemaMutation,
  useExportDataMutation,
  useCreateBranchMutation,
  useCreateVersionMutation,
  useSetDefaultBranchMutation,
} from "@/graphql/generated";

export default ({}) => {
  const [deleteMutation, execDeleteMutation] = useDeleteSchemaMutation();
  const [exportMutation, execExportMutation] = useExportDataMutation();
  const [createBranchMutation, execCreateBranchMutation] =
    useCreateBranchMutation();
  const [createVersionMutation, execCreateVersionMutation] =
    useCreateVersionMutation();
  const [setDefaultMutation, execSetDefaultMutation] =
    useSetDefaultBranchMutation();

  return {
    mutations: {
      deleteMutation,
      execDeleteMutation,
      exportMutation,
      execExportMutation,
      createBranchMutation,
      execCreateBranchMutation,
      createVersionMutation,
      execCreateVersionMutation,
      setDefaultMutation,
      execSetDefaultMutation,
    },
  };
};
