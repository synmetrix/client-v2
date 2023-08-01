import RootLayout from "@/layouts/RootLayout";
import { membersMock } from "@/mocks/members";

import Members from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/Members",
  component: Members,
} as Meta<typeof Members>;

const Template: StoryFn<typeof Members> = (args) => (
  <RootLayout>
    <Members {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  members: membersMock,
};
