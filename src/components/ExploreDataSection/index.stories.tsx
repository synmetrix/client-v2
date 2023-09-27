import RootLayout from "@/layouts/RootLayout";

import ExploreDataSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreDataSection",
  component: ExploreDataSection,
} as Meta<typeof ExploreDataSection>;

const Template: StoryFn<typeof ExploreDataSection> = (args) => (
  <RootLayout>
    <ExploreDataSection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
