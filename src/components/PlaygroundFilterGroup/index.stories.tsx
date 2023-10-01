import RootLayout from "@/layouts/RootLayout";
import type { FilterMember } from "@/types/cube";

import PlaygroundFilterGroup from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/PlaygroundFilterGroup",
  component: PlaygroundFilterGroup,
} as Meta<typeof PlaygroundFilterGroup>;

const Template: StoryFn<typeof PlaygroundFilterGroup> = (args) => {
  const [members, setMembers] = useState<FilterMember[]>(args.members);

  const updateMethods = {
    update: (member: FilterMember, newMember: FilterMember) =>
      setMembers((prev) => {
        const newState = [...prev];
        const memberIndex = prev.findIndex(
          (m) => JSON.stringify(m) === JSON.stringify(member)
        );
        newState[memberIndex] = newMember;
        return newState;
      }),
    remove: (_: FilterMember) => setMembers([]),
  };

  return (
    <RootLayout>
      <PlaygroundFilterGroup
        {...args}
        updateMethods={updateMethods}
        members={members}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  members: [
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
  ],
  availableMembers: [
    {
      isVisible: true,
      name: "Orders.status",
      shortTitle: "Status",
      suggestFilterValues: true,
      title: "Orders Status",
      type: "string",
    },
    {
      isVisible: true,
      name: "Orders.createdAt",
      shortTitle: "Created at",
      suggestFilterValues: true,
      title: "Orders Created at",
      type: "time",
    },
    {
      isVisible: true,
      name: "Orders.completedAt",
      shortTitle: "Completed at",
      suggestFilterValues: true,
      title: "Orders Completed at",
      type: "time",
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
      isVisible: true,
      name: "Orders.count",
      shortTitle: "Count",
      title: "Orders Count",
      type: "number",
    },
    {
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
    {
      isVisible: true,
      name: "Products.description",
      shortTitle: "Description",
      suggestFilterValues: true,
      title: "Products Description",
      type: "string",
    },
    {
      isVisible: true,
      name: "Products.name",
      shortTitle: "Name",
      suggestFilterValues: true,
      title: "Products Name",
      type: "string",
    },
    {
      isVisible: true,
      name: "Products.createdAt",
      shortTitle: "Created at",
      suggestFilterValues: true,
      title: "Products Created at",
      type: "time",
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
      isVisible: true,
      name: "Products.count",
      shortTitle: "Count",
      title: "Products Count",
      type: "number",
    },
    {
      isVisible: true,
      name: "Suppliers.email",
      shortTitle: "Email",
      suggestFilterValues: true,
      title: "Suppliers Email",
      type: "string",
    },
    {
      isVisible: true,
      name: "Suppliers.company",
      shortTitle: "Company",
      suggestFilterValues: true,
      title: "Suppliers Company",
      type: "string",
    },
    {
      isVisible: true,
      name: "Suppliers.address",
      shortTitle: "Address",
      suggestFilterValues: true,
      title: "Suppliers Address",
      type: "string",
    },
    {
      isVisible: true,
      name: "Suppliers.createdAt",
      shortTitle: "Created at",
      suggestFilterValues: true,
      title: "Suppliers Created at",
      type: "time",
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
      isVisible: true,
      name: "Suppliers.count",
      shortTitle: "Count",
      title: "Suppliers Count",
      type: "number",
    },
    {
      isVisible: true,
      name: "LineItems.createdAt",
      shortTitle: "Created at",
      suggestFilterValues: true,
      title: "Line Items Created at",
      type: "time",
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
      isVisible: true,
      name: "LineItems.count",
      shortTitle: "Count",
      title: "Line Items Count",
      type: "number",
    },
    {
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
    {
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
    {
      isVisible: true,
      name: "LineItemsCountByStates.usersState",
      shortTitle: "Users State",
      suggestFilterValues: true,
      title: "Line Items Count by States Users State",
      type: "string",
    },
  ],

  addMemberName: "Filter",
};
