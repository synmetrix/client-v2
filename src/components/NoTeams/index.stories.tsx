import RootLayout from "@/layouts/RootLayout";

import NoTeams from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Teams/NoTeams",
  component: NoTeams,
} as Meta<typeof NoTeams>;

const Template: StoryFn<typeof NoTeams> = (args) => (
  <RootLayout>
    <NoTeams {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
