import RootLayout from "@/layouts/RootLayout";

import ExploreDataSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreDataSection",
  component: ExploreDataSection,
} as Meta<typeof ExploreDataSection>;

const Template: StoryFn<typeof ExploreDataSection> = (args) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <RootLayout>
      <ExploreDataSection
        {...args}
        isActive={isActive}
        onToggleSection={() => setIsActive((prev) => !prev)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  explorationRowId: "384904a6-e83c-47bf-b554-3faf8e55bc45",
  height: 300,
  isActive: true,
  onExec: () => {},
  queryState: {
    columns: [
      {
        Header: "Orders Status",
        colId: "Orders.status",
        id: "Orders.status",
        type: "string",
      },
      {
        Header: "Orders Count",
        colId: "Orders.count",
        id: "Orders.count",
        type: "number",
      },
    ],
    dimensions: ["Orders.status"],
    measures: ["Orders.number", "Orders.count"],
    segments: [],
    timeDimensions: [],
    hitLimit: false,
    limit: 1000,
    loading: false,
    offset: 0,
    order: [],
    page: 0,
    progress: {},
    rawSql: {
      params: [],
      preAggregations: [],
      sql: `SELECT
      "orders".status "orders__status", sum("orders".number) "orders__number", count("orders".id) "orders__count"
    FROM
      public.orders AS "orders"  GROUP BY 1 LIMIT 1000`,
    },
    rows: [
      {
        "Orders.count": "3346",
        "Orders.number": "169206",
        "Orders.status": "completed",
      },
      {
        "Orders.count": "3354",
        "Orders.number": "167590",
        "Orders.status": "processing",
      },
      {
        "Orders.count": "3300",
        "Orders.number": "167894",
        "Orders.status": "shipped",
      },
    ],
    settings: {},
    skippedMembers: [],
    timezone: "UTC",
  },
  rowHeight: 20,
  screenshotMode: false,
  selectedQueryMembers: {
    dimensions: [
      {
        index: 0,
        isVisible: true,
        name: "Orders.status",
        shortTitle: "Status",
        suggestFilterValues: true,
        title: "Orders Status",
        type: "string",
      },
    ],
    measures: [
      {
        aggType: "sum",
        cumulative: false,
        cumulativeTotal: false,
        drillMembers: [],
        drillMembersGrouped: { dimensions: [], measures: [] },
        index: 0,
        isVisible: true,
        name: "Orders.number",
        shortTitle: "Number",
        title: "Orders Number",
        type: "number",
      },
      {
        aggType: "count",
        cumulative: false,
        cumulativeTotal: false,
        drillMembers: [],
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
        index: 1,
        isVisible: true,
        name: "Orders.count",
        shortTitle: "Count",
        title: "Orders Count",
        type: "number",
      },
    ],
    filters: [],
    segments: [],
    timeDimensions: [],
  },
  state: {
    dataSection: "results",
    experimentsCount: 0,
    filtersCount: 0,
    modelingSection: "modelDefinition",
  },
  width: 1203,
};
