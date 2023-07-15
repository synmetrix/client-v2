import RootLayout from "@/layouts/RootLayout";

import SecurityForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/PersonalInfo/SecurityForm",
  component: SecurityForm,
} as Meta<typeof SecurityForm>;

const Template: StoryFn<typeof SecurityForm> = (args) => (
  <RootLayout>
    <SecurityForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  onSubmit: console.log,
};
