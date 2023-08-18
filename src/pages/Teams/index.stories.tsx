import RootLayout from "@/layouts/RootLayout";
import { teams } from "@/mocks/teams";

import Teams from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Teams",
  component: Teams,
} as Meta<typeof Teams>;

const Template: StoryFn<typeof Teams> = (args) => (
  <RootLayout>
    <Teams {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  teams,
  currentTeam: "2",
};
