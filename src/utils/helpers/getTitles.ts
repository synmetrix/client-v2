import type { QuerySettings } from "@/types/querySettings";

export const getTitle = (
  settings: QuerySettings,
  column: { shortTitle: string; title: string }
) => (settings.hideCubeNames ? column.shortTitle : column.title);
