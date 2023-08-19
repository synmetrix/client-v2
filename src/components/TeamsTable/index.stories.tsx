import RootLayout from "@/layouts/RootLayout";
import { teams } from "@/mocks/teams";

import TeamsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Teams/TeamsTable",
  component: TeamsTable,
} as Meta<typeof TeamsTable>;

const Template: StoryFn<typeof TeamsTable> = (args) => (
  <RootLayout>
    <TeamsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  teams,
  currentTeam: "1",
  onEdit: console.log,
  onRemove: console.log,
};
