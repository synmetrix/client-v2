import RootLayout from "@/layouts/RootLayout";

import NoModels from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/NoModels",
  component: NoModels,
} as Meta<typeof NoModels>;

const Template: StoryFn<typeof NoModels> = () => (
  <RootLayout>
    <NoModels />
  </RootLayout>
);

export const Default = Template.bind({});
