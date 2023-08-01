import RootLayout from "@/layouts/RootLayout";

import PersonalInfo from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/PersonalInfo",
  component: PersonalInfo,
} as Meta<typeof PersonalInfo>;

const Template: StoryFn<typeof PersonalInfo> = (args) => (
  <RootLayout>
    <PersonalInfo {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
