import RootLayout from "@/layouts/RootLayout";

import NoAlerts from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/NoAlerts",
  component: NoAlerts,
} as Meta<typeof NoAlerts>;

const Template: StoryFn<typeof NoAlerts> = (args) => (
  <RootLayout>
    <NoAlerts {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
