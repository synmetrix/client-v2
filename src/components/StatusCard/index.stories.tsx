import RootLayout from "@/layouts/RootLayout";

import StatusCard from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/StatusCard",
  component: StatusCard,
  argTypes: {
    status: {
      defaultValue: "success",
      type: "string",
      description: "Status",
      options: ["success", "error"],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof StatusCard>;

const Template: StoryFn<typeof StatusCard> = (args) => (
  <RootLayout>
    <StatusCard {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  status: "success",
  count: 4,
};
