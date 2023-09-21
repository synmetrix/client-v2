export interface CubeMember {
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
  timeDimensions: Metric[];
}

export interface Metric {
  name: string;
  shortTitle: string;
  title: string;
}

export interface CubeMemberMeta {
  category?: string;
  index?: number;
  selectedIndex?: number;
  lastClickedMember?: any;
  hovered?: any;
}

export interface SubSection {
  members: CubeMember[];
  haveSelected: boolean;
  subSectionType: string;
}
