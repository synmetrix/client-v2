import { useCallback } from "react";
import { useQuery as useURQLQuery } from "urql";

import type {
  AnyVariables,
  RequestPolicy,
  UseQueryArgs,
  UseQueryExecute,
  UseQueryResponse,
} from "urql";

interface Options {
  requestPolicy: RequestPolicy;
  role: string;
}

export default function <O extends AnyVariables, D>(
  query: UseQueryArgs<O, D>,
  options: Options = {} as Options
): UseQueryResponse {
  const [data, doQueryData] = useURQLQuery<D, O>(query);

  const execQueryData: UseQueryExecute = useCallback(
    (context) => {
      return doQueryData({
        requestPolicy: options.requestPolicy,
        role: options.role,
        ...context,
      });
    },
    [doQueryData, options.requestPolicy, options.role]
  );

  return [data, execQueryData];
}
