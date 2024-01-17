import RootLayout from "@/layouts/RootLayout";

import VersionsList from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/VersionsList",
  component: VersionsList,
} as Meta<typeof VersionsList>;

const Template: StoryFn<typeof VersionsList> = (args) => (
  <RootLayout>
    <VersionsList {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  onRestore: console.log,
};
