import RootLayout from "@/layouts/RootLayout";

import MembersForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/Members/MembersForm",
  component: MembersForm,
} as Meta<typeof MembersForm>;

const Template: StoryFn<typeof MembersForm> = (args) => (
  <RootLayout>
    <MembersForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  onSubmit: console.log,
};
