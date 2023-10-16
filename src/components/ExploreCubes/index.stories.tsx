import RootLayout from "@/layouts/RootLayout";
import { availableQueryMembers, selectedQueryMembers } from "@/mocks/explore";

import ExploreCubes from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubes",
  component: ExploreCubes,
} as Meta<typeof ExploreCubes>;

const Template: StoryFn<typeof ExploreCubes> = (args) => (
  <RootLayout>
    <ExploreCubes {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers,
  selectedQueryMembers,
};
