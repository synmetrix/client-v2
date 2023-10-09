import RootLayout from "@/layouts/RootLayout";
import { availableQueryMembers, selectedQueryMembers } from "@/mocks/explore";

import ExploreCubesSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesSection",
  component: ExploreCubesSection,
} as Meta<typeof ExploreCubesSection>;

const Template: StoryFn<typeof ExploreCubesSection> = (args) => (
  <RootLayout>
    <ExploreCubesSection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  selectedMembers: selectedQueryMembers,
  members: availableQueryMembers,
};
