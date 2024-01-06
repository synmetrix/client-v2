import RootLayout from "@/layouts/RootLayout";

import ExptyExploration from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/DataSources/ExptyExploration",
  component: ExptyExploration,
} as Meta<typeof ExptyExploration>;

const Template: StoryFn<typeof ExptyExploration> = () => (
  <RootLayout>
    <ExptyExploration />
  </RootLayout>
);

export const Default = Template.bind({});
