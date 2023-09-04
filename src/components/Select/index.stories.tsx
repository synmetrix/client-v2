import RootLayout from "@/layouts/RootLayout";

import BranchIcon from "@/assets/branch.svg";

import Select from ".";

import type { StoryFn, Meta } from "@storybook/react";

const mapping = { withIcon: <BranchIcon />, withoutIcon: undefined };

export default {
  title: "Components/Basic/Select",
  component: Select,
  argTypes: {
    prefixIcon: {
      type: "boolean",
      description: "With icon",
      defaultValue: mapping.withoutIcon,
      options: Object.keys(mapping),
      mapping,
      control: {
        type: "radio",
        labels: {
          withIcon: "With icon",
          withoutIcon: "Without icon",
        },
      },
    },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => (
  <RootLayout>
    <Select {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  options: [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
  ],
  placeholder: "test test",
};
