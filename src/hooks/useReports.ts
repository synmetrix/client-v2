import type { ReportFormType } from "@/types/report";
import type {
  Reports_Pk_Columns_Input,
  Reports_Set_Input,
  SendTestAlertMutationVariables,
} from "@/graphql/generated";
import {
  useCreateReportMutation,
  useDeleteReportMutation,
  useUpdateReportMutation,
  useSendTestAlertMutation,
} from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";

interface Props {
  report?: ReportFormType;
  explorationId?: string;
}

export default ({ report, explorationId }: Props) => {
  const { currentTeamId } = CurrentUserStore();

  const [createMutationData, execInsertMutation] = useCreateReportMutation();
  const [updateMutationData, execUpdateMutation] = useUpdateReportMutation();
  const [deleteMutationData, execDeleteMutation] = useDeleteReportMutation();
  const [sendTestMutationData, execSendTestMutation] =
    useSendTestAlertMutation();

  const createReport = useCallback(
    (values: ReportFormType) => {
      const newReportWithExplorationPayload = {
        name: values.name,
        schedule: values.schedule,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
        exploration_id: explorationId,
        team_id: currentTeamId,
      };

      execInsertMutation({ object: newReportWithExplorationPayload });
    },
    [explorationId, currentTeamId, execInsertMutation]
  );

  const updateReport = useCallback(
    (values: ReportFormType) => {
      const updateAlerPayload = {
        name: values.name,
        schedule: values.schedule,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
      };

      const payload = {
        pk_columns: { id: report?.id } as Reports_Pk_Columns_Input,
        _set: updateAlerPayload as Reports_Set_Input,
      };

      execUpdateMutation(payload);
    },
    [execUpdateMutation, report]
  );

  const onSendTest = (values: ReportFormType) => {
    const { deliveryConfig, exploration, type, name } = values;

    const mutationPayload: SendTestAlertMutationVariables = {
      explorationId: exploration?.id || explorationId,
      deliveryType: type,
      deliveryConfig,
      name,
    };

    execSendTestMutation(mutationPayload);
  };

  return {
    mutations: {
      createMutationData,
      execInsertMutation,
      updateMutationData,
      execUpdateMutation,
      deleteMutationData,
      execDeleteMutation,
      sendTestMutationData,
      execSendTestMutation,
    },
    createReport,
    updateReport,
    onSendTest,
  };
};
