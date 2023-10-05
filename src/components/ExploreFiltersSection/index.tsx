import type { CollapsePanelProps } from "antd";
import type { FC } from "react";

interface ExploreFiltersSectionProps
  extends Omit<CollapsePanelProps, "header"> {
  onToggleSection: (section: string) => void;
}

const ExploreFiltersSection: FC = () => {
  return <>ExploreFiltersSection</>;
};

export default ExploreFiltersSection;
