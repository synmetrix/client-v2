import RootLayout from "@/layouts/RootLayout";

import ModelsSidebar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/ModelsSidebar",
  component: ModelsSidebar,
} as Meta<typeof ModelsSidebar>;

const Template: StoryFn<typeof ModelsSidebar> = (args) => (
  <RootLayout>
    <ModelsSidebar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  branches: ["main-default", "dev"],
};
