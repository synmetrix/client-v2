import RootLayout from "@/layouts/RootLayout";

import NoSignals from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/NoSignals",
  component: NoSignals,
} as Meta<typeof NoSignals>;

const Template: StoryFn<typeof NoSignals> = (args) => (
  <RootLayout>
    <NoSignals {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
