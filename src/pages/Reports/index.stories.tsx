import RootLayout from "@/layouts/RootLayout";
import { alerts } from "@/mocks/alerts";
import { SAMPLE_EXPLORATION } from "@/mocks/exploration";

import Reports from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Reports",
  component: Reports,
} as Meta<typeof Reports>;

const Template: StoryFn<typeof Reports> = (args) => (
  <RootLayout>
    <Reports {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  alerts,
  exploration: SAMPLE_EXPLORATION,
};
