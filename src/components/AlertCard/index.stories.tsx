import RootLayout from "@/layouts/RootLayout";
import { alerts } from "@/mocks/alerts";

import AlertCard from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alerts/AlertCard",
  component: AlertCard,
} as Meta<typeof AlertCard>;

const Template: StoryFn<typeof AlertCard> = (args) => (
  <RootLayout>
    <AlertCard {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  alert: alerts[0],
};
