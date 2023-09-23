export interface Cube {
  connectedComponent: number;
  title: string;
  name: string;
  type: string;
  operator: string;
  values: any;
  shortTitle: string;
  granularity: string;
  dimension: {
    name: string;
  };
  meta: {
    subSection: string;
    subSectionType: string;
  };
  measures: Metric[];
  dimensions: Metric[];
  segments?: Metric[];
  timeDimensions?: Metric[];
}

export interface Metric {
  name: string;
  title: string;
  shortTitle: string;
  isVisible: boolean;
  aggType: string;
  cumulative: boolean;
  cumulativeTotal: boolean;
  drillMembers: [];
  drillMembersGrouped: {
    dimensions: Metric[];
    measures: Metric[];
  };
}

export interface Dimension {
  isVisible: boolean;
  suggestFilterValues: boolean;
  title: string;
  type: string;
}

export interface CubeMeta {
  category?: string;
  index?: number;
  selectedIndex?: number;
  lastClickedMember?: any;
  hovered?: any;
}

export interface SubSection {
  members: Cube[];
  haveSelected: boolean;
  subSectionType: string;
}
