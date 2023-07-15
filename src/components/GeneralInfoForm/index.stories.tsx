import RootLayout from "@/layouts/RootLayout";

import GeneralInfoForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/PersonalInfo/GeneralInfoForm",
  component: GeneralInfoForm,
} as Meta<typeof GeneralInfoForm>;

const Template: StoryFn<typeof GeneralInfoForm> = (args) => (
  <RootLayout>
    <GeneralInfoForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  initialValue: {
    email: "email@email.ge",
    fullName: "Full Name",
  },
  onSubmit: console.log,
};
