import { useCallback } from "react";
import { useQuery as useURQLQuery } from "urql";

import type { AnyVariables, RequestPolicy, UseQueryArgs } from "urql";

interface Options {
  requestPolicy: RequestPolicy;
  role: string;
}

export default (
  query: UseQueryArgs<AnyVariables, any>,
  options: Options = {} as Options
): any => {
  const [data, doQueryData] = useURQLQuery(query);

  const execQueryData = useCallback(
    (context: object) => {
      return doQueryData({
        requestPolicy: options.requestPolicy,
        role: options.role,
        ...context,
      });
    },
    [doQueryData, options.requestPolicy, options.role]
  );

  return [data, execQueryData];
};
