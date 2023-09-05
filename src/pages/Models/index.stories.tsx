import RootLayout from "@/layouts/RootLayout";
import { versions } from "@/mocks/versions";

import Models from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Models",
  component: Models,
} as Meta<typeof Models>;

const Template: StoryFn<typeof Models> = (args) => (
  <RootLayout>
    <Models {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  versions,
  branches: ["main-default", "dev"],
  docs: "https://google.com",
  currentVersion: versions[0],
};
