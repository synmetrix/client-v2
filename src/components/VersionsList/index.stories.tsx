import RootLayout from "@/layouts/RootLayout";
import { versions } from "@/mocks/versions";

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
  versions,
  onRestore: console.log,
  onSave: () => console.log("save"),
};
