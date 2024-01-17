import RootLayout from "@/layouts/RootLayout";

import VersionPreview from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/VersionPreview",
  component: VersionPreview,
} as Meta<typeof VersionPreview>;

const Template: StoryFn<typeof VersionPreview> = (args) => (
  <RootLayout>
    <VersionPreview {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  version: "846469daa308cb06d906585b21c168fa",
  count: 52,
  href: "/docs/e7f919ee-fde2-406a-a716-189b72fa45e1",
};
