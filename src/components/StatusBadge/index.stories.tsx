import RootLayout from "@/layouts/RootLayout";

import StatusBadge from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/StatusBadge",
  component: StatusBadge,
} as Meta<typeof StatusBadge>;

const Template: StoryFn<typeof StatusBadge> = (args) => (
  <RootLayout>
    <StatusBadge {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
