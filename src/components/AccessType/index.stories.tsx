import RootLayout from "@/layouts/RootLayout";

import AccessType from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/AccessType",
  component: AccessType,
  argTypes: {
    access: {
      type: "string",
      description: "Type",
      defaultValue: "partial",
      options: ["full", "partial", "no"],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof AccessType>;

const Template: StoryFn<typeof AccessType> = (args) => (
  <RootLayout>
    <AccessType {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  access: "partial",
};
