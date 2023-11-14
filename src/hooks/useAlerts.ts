import type { AlertFormType } from "@/types/alert";
import type {
  Alerts_Set_Input,
  Alerts_Pk_Columns_Input,
  SendTestAlertMutationVariables,
} from "@/graphql/generated";
import {
  useDeleteAlertMutation,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useSendTestAlertMutation,
} from "@/graphql/generated";
import CurrentUserStore from "@/stores/CurrentUserStore";

interface Props {
  alert?: AlertFormType;
  explorationId?: string;
}

export default ({ alert, explorationId }: Props) => {
  const { currentTeamId } = CurrentUserStore();

  const [createMutationData, execInsertMutation] = useCreateAlertMutation();
  const [updateMutationData, execUpdateMutation] = useUpdateAlertMutation();
  const [deleteMutationData, execDeleteMutation] = useDeleteAlertMutation();
  const [sendTestMutationData, execSendTestMutation] =
    useSendTestAlertMutation();

  const createAlert = useCallback(
    (values: AlertFormType) => {
      const newAlertWithExplorationPayload = {
        name: values.name,
        schedule: values.schedule,
        trigger_config: values.triggerConfig,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
        exploration_id: explorationId,
        team_id: currentTeamId,
      };

      execInsertMutation({ object: newAlertWithExplorationPayload });
    },
    [explorationId, currentTeamId, execInsertMutation]
  );

  const updateAlert = useCallback(
    (values: AlertFormType) => {
      const updateAlerPayload = {
        name: values.name,
        schedule: values.schedule,
        trigger_config: values.triggerConfig,
        delivery_type: values.type,
        delivery_config: values.deliveryConfig,
      };

      const payload = {
        pk_columns: { id: alert?.id } as Alerts_Pk_Columns_Input,
        _set: updateAlerPayload as Alerts_Set_Input,
      };

      execUpdateMutation(payload);
    },
    [alert?.id, execUpdateMutation]
  );

  const onSendTest = (values: AlertFormType) => {
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
    createAlert,
    updateAlert,
    onSendTest,
  };
};
