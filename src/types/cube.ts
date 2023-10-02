export interface Cube {
  connectedComponent: number;
  title: string;
  name: string;
  type: string;
  operator: string;
  shortTitle: string;
  granularity: string;
  meta: {
    subSection: string;
    subSectionType: string;
  };
  measures: CubeMember[];
  dimensions: CubeMember[];
  segments: CubeMember[];
  timeDimensions: CubeMember[];
}

export interface CubeMember {
  name: string;
  title: string;
  shortTitle: string;
  isVisible: boolean;
  aggType?: string;
  cumulative?: boolean;
  cumulativeTotal?: boolean;
  drillMembers?: [];
  suggestFilterValues?: boolean;
  drillMembersGrouped?: {
    dimensions: CubeMember[];
    measures: CubeMember[];
  };
  dimension?: {
    name: string;
    type: string;
  };
  granularity?: string;
  type: string;
  meta?: any;
  index?: number;
}

export interface Dimension {
  isVisible: boolean;
  suggestFilterValues: boolean;
  title: string;
  type: string;
}

export interface SubSection {
  members: CubeMember[];
  haveSelected: boolean;
  subSectionType: string;
}

export interface FilterMember {
  name?: string;
  dimension: CubeMember;
  index?: number;
  operators: {
    name: string;
    title: string;
  }[];
  operator: string;
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

export interface CubeMembers {
  timeDimensions?: CubeMember[];
  dimensions?: CubeMember[];
  measures?: CubeMember[];
  filters?: FilterMember[];
}
