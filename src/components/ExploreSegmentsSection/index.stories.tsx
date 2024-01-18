import RootLayout from "@/layouts/RootLayout";

import ExploreSegmentsSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreSegmentsSection",
  component: ExploreSegmentsSection,
} as Meta<typeof ExploreSegmentsSection>;

const Template: StoryFn<typeof ExploreSegmentsSection> = (args) => (
  <RootLayout>
    <ExploreSegmentsSection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  segments: [
    {
      index: 0,
      isVisible: true,
      name: "Actors.test_segment",
      //@ts-ignore
      public: true,
      shortTitle: "Test Segment",
      title: "Actors Test Segment",
    },
  ],
  onRemove: console.log,
};
