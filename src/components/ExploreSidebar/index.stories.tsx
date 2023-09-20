import RootLayout from "@/layouts/RootLayout";

import ExploreSidebar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreSidebar",
  component: ExploreSidebar,
} as Meta<typeof ExploreSidebar>;

const Template: StoryFn<typeof ExploreSidebar> = (args) => (
  <RootLayout>
    <ExploreSidebar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers: {
    test: "test",
  },
  selectedQueryMembers: ["test"],
};
