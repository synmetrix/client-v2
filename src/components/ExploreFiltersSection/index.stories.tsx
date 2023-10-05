import RootLayout from "@/layouts/RootLayout";

import ExploreFiltersSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreFiltersSection",
  component: ExploreFiltersSection,
} as Meta<typeof ExploreFiltersSection>;

const Template: StoryFn<typeof ExploreFiltersSection> = (args) => (
  <RootLayout>
    <ExploreFiltersSection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers: {
    Orders: {
      measures: {
        "Orders.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Orders.count",
          shortTitle: "Count",
          title: "Orders Count",
          type: "number",
        },
        "Orders.number": {
          aggType: "sum",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Orders.number",
          shortTitle: "Number",
          title: "Orders Number",
          type: "number",
        },
      },
      dimensions: {
        "Orders.status": {
          isVisible: true,
          name: "Orders.status",
          shortTitle: "Status",
          suggestFilterValues: true,
          title: "Orders Status",
          type: "string",
        },
        "Orders.createdAt": {
          isVisible: true,
          name: "Orders.createdAt",
          shortTitle: "Created at",
          suggestFilterValues: true,
          title: "Orders Created at",
          type: "time",
        },
        "Orders.completedAt": {
          isVisible: true,
          name: "Orders.completedAt",
          shortTitle: "Completed at",
          suggestFilterValues: true,
          title: "Orders Completed at",
          type: "time",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    Products: {
      measures: {
        "Products.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Products.count",
          shortTitle: "Count",
          title: "Products Count",
          type: "number",
        },
      },
      dimensions: {
        "Products.description": {
          isVisible: true,
          name: "Products.description",
          shortTitle: "Description",
          suggestFilterValues: true,
          title: "Products Description",
          type: "string",
        },
        "Products.name": {
          isVisible: true,
          name: "Products.name",
          shortTitle: "Name",
          suggestFilterValues: true,
          title: "Products Name",
          type: "string",
        },
        "Products.createdAt": {
          isVisible: true,
          name: "Products.createdAt",
          shortTitle: "Created at",
          suggestFilterValues: true,
          title: "Products Created at",
          type: "time",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    Suppliers: {
      measures: {
        "Suppliers.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Suppliers.count",
          shortTitle: "Count",
          title: "Suppliers Count",
          type: "number",
        },
      },
      dimensions: {
        "Suppliers.email": {
          isVisible: true,
          name: "Suppliers.email",
          shortTitle: "Email",
          suggestFilterValues: true,
          title: "Suppliers Email",
          type: "string",
        },
        "Suppliers.company": {
          isVisible: true,
          name: "Suppliers.company",
          shortTitle: "Company",
          suggestFilterValues: true,
          title: "Suppliers Company",
          type: "string",
        },
        "Suppliers.address": {
          isVisible: true,
          name: "Suppliers.address",
          shortTitle: "Address",
          suggestFilterValues: true,
          title: "Suppliers Address",
          type: "string",
        },
        "Suppliers.createdAt": {
          isVisible: true,
          name: "Suppliers.createdAt",
          shortTitle: "Created at",
          suggestFilterValues: true,
          title: "Suppliers Created at",
          type: "time",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    LineItems: {
      measures: {
        "LineItems.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "LineItems.count",
          shortTitle: "Count",
          title: "Line Items Count",
          type: "number",
        },
        "LineItems.price": {
          aggType: "sum",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "LineItems.price",
          shortTitle: "Price",
          title: "Line Items Price",
          type: "number",
        },
        "LineItems.quantity": {
          aggType: "sum",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "LineItems.quantity",
          shortTitle: "Quantity",
          title: "Line Items Quantity",
          type: "number",
        },
      },
      dimensions: {
        "LineItems.createdAt": {
          isVisible: true,
          name: "LineItems.createdAt",
          shortTitle: "Created at",
          suggestFilterValues: true,
          title: "Line Items Created at",
          type: "time",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    LineItemsCountByStates: {
      measures: {
        "LineItemsCountByStates.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "LineItemsCountByStates.count",
          shortTitle: "Count",
          title: "Line Items Count by States Count",
          type: "number",
        },
        "LineItemsCountByStates.lineItemsCount": {
          aggType: "sum",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "LineItemsCountByStates.lineItemsCount",
          shortTitle: "Line Items Count",
          title: "Line Items Count by States Line Items Count",
          type: "number",
        },
      },
      dimensions: {
        "LineItemsCountByStates.usersState": {
          isVisible: true,
          name: "LineItemsCountByStates.usersState",
          shortTitle: "Users State",
          suggestFilterValues: true,
          title: "Line Items Count by States Users State",
          type: "string",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    Companies: {
      measures: {
        "Companies.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Companies.count",
          shortTitle: "Count",
          title: "Companies Count",
          type: "number",
        },
      },
      dimensions: {
        "Companies.name": {
          isVisible: true,
          name: "Companies.name",
          shortTitle: "Name",
          suggestFilterValues: true,
          title: "Companies Name",
          type: "string",
        },
        "Companies.address": {
          isVisible: true,
          name: "Companies.address",
          shortTitle: "Address",
          suggestFilterValues: true,
          title: "Companies Address",
          type: "string",
        },
        "Companies.email": {
          isVisible: true,
          name: "Companies.email",
          shortTitle: "Email",
          suggestFilterValues: true,
          title: "Companies Email",
          type: "string",
        },
        "Companies.phone": {
          isVisible: true,
          name: "Companies.phone",
          shortTitle: "Phone",
          suggestFilterValues: true,
          title: "Companies Phone",
          type: "string",
        },
      },
      segments: {},
      timeDimensions: {},
    },
    Users: {
      measures: {
        "Users.count": {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          drillMembers: [],
          drillMembersGrouped: {
            dimensions: [],
            measures: [],
          },
          isVisible: true,
          name: "Users.count",
          shortTitle: "Count",
          title: "Users Count",
          type: "number",
        },
      },
      dimensions: {
        "Users.city": {
          isVisible: true,
          name: "Users.city",
          shortTitle: "City",
          suggestFilterValues: true,
          title: "Users City",
          type: "string",
        },
        "Users.company": {
          isVisible: true,
          name: "Users.company",
          shortTitle: "Company",
          suggestFilterValues: true,
          title: "Users Company",
          type: "string",
        },
        "Users.gender": {
          isVisible: true,
          name: "Users.gender",
          shortTitle: "Gender",
          suggestFilterValues: true,
          title: "Users Gender",
          type: "string",
        },
        "Users.firstName": {
          isVisible: true,
          name: "Users.firstName",
          shortTitle: "First Name",
          suggestFilterValues: true,
          title: "Users First Name",
          type: "string",
        },
        "Users.lastName": {
          isVisible: true,
          name: "Users.lastName",
          shortTitle: "Last Name",
          suggestFilterValues: true,
          title: "Users Last Name",
          type: "string",
        },
        "Users.state": {
          isVisible: true,
          name: "Users.state",
          shortTitle: "State",
          suggestFilterValues: true,
          title: "Users State",
          type: "string",
        },
        "Users.createdAt": {
          isVisible: true,
          name: "Users.createdAt",
          shortTitle: "Created at",
          suggestFilterValues: true,
          title: "Users Created at",
          type: "time",
        },
      },
      segments: {},
      timeDimensions: {},
    },
  },
  isActive: true,
  selectedQueryMembers: {
    measures: [
      {
        index: 0,
        aggType: "count",
        cumulative: false,
        cumulativeTotal: false,
        drillMembers: [],
        drillMembersGrouped: {
          dimensions: [],
          measures: [],
        },
        isVisible: true,
        name: "Orders.count",
        shortTitle: "Count",
        title: "Orders Count",
        type: "number",
      },
    ],
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
    segments: [],
    timeDimensions: [],
    filters: [
      {
        dimension: {
          isVisible: true,
          name: "Orders.status",
          shortTitle: "Status",
          suggestFilterValues: true,
          title: "Orders Status",
          type: "string",
        },
        operator: "set",
        operators: [
          {
            name: "contains",
            title: "contains",
          },
          {
            name: "notContains",
            title: "does not contain",
          },
          {
            name: "equals",
            title: "equals",
          },
          {
            name: "notEquals",
            title: "does not equal",
          },
          {
            name: "set",
            title: "is set",
          },
          {
            name: "notSet",
            title: "is not set",
          },
        ],
        index: 0,
      },
      {
        dimension: {
          aggType: "count",
          cumulative: false,
          cumulativeTotal: false,
          isVisible: true,
          name: "Orders.count",
          shortTitle: "Count",
          title: "Orders Count",
          type: "number",
        },
        operator: "set",
        operators: [
          {
            name: "equals",
            title: "equals",
          },
          {
            name: "notEquals",
            title: "does not equal",
          },
          {
            name: "set",
            title: "is set",
          },
          {
            name: "notSet",
            title: "is not set",
          },
          {
            name: "gt",
            title: ">",
          },
          {
            name: "gte",
            title: ">=",
          },
          {
            name: "lt",
            title: "<",
          },
          {
            name: "lte",
            title: "<=",
          },
        ],
        index: 1,
      },
    ],
  },
  state: {
    modelingSection: "modelDefinition",
    dataSection: "results",
    filtersCount: 2,
    experimentsCount: 0,
  },
  onItemClick: console.log,
  onMemberChange: console.log,
  onToggleSection: console.log,
};
