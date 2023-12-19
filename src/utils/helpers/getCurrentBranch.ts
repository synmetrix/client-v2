import type { DataSourceInfo } from "@/types/dataSource";

export default function getCurrentBranch(dataSource: DataSourceInfo | null) {
  if (!dataSource) return null;

  const branchFromLocalStorage = localStorage.getItem(
    `${dataSource.id}:currentBranch`
  );
  return branchFromLocalStorage
    ? JSON.parse(branchFromLocalStorage)
    : dataSource?.branches?.[0].id;
}
