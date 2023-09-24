export interface Cube {
  connectedComponent: number;
  title: string;
  name: string;
  type: string;
  operator: string;
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
  dimension?: {
    name: string;
    type: string;
  };
  granularity?: string;
  type?: string;
  meta?: any;
}

export interface Dimension {
  isVisible: boolean;
  suggestFilterValues: boolean;
  title: string;
  type: string;
}

export interface SubSection {
  members: Metric[];
  haveSelected: boolean;
  subSectionType: string;
}

export interface FilterMember {
  dimension: Metric;
  index?: number;
  operator?: {
    name: string;
    title: string;
  }[];
  values?: any;
}

export interface CubeMeta {
  cubesMap?: Record<string, Cube>;
  name?: string;
  measures?: { type: string; name: string }[];
  dimensions?: { type: string; name: string }[];
  segments?: { type: string; name: string }[];
  category?: string;
  index?: number;
  selectedIndex?: number;
  lastClickedMember?: any;
  hovered?: any;
}

export interface SelectedMembers {
  timeDimensions?: Metric[];
  dimensions?: Metric[];
  measures?: Metric[];
  filters?: FilterMember;
}
