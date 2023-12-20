import { useEffect, useMemo } from "react";

import { useVersionByBranchIdQuery } from "@/graphql/generated";
import type { VersionByBranchIdQueryVariables } from "@/graphql/generated";
import type { Version } from "@/types/version";

type Pagination = Omit<VersionByBranchIdQueryVariables, "where" | "order_by">;

const getListVariables = (
  branchId?: string,
  pagination?: Partial<Pagination>
): VersionByBranchIdQueryVariables => {
  let res = {
    branch_id: branchId,
  };

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  return res;
};

interface Props {
  branchId?: string;
  pagination?: Partial<Pagination>;
}

export default ({ branchId, pagination }: Props) => {
  const [allData, execQueryAll] = useVersionByBranchIdQuery({
    variables: getListVariables(branchId, pagination),
    pause: true,
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (branchId) {
      execQueryAll();
    }
  }, [branchId, execQueryAll]);

  const versions = useMemo(
    () => allData.data?.versions || ([] as Version[]),
    [allData.data]
  );

  return {
    versions,
    queries: {
      allData,
      execQueryAll,
    },
  };
};
