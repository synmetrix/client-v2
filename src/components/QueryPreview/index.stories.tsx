import RootLayout from "@/layouts/RootLayout";
import { queryPreviewMock } from "@/mocks/queryPreview";

import QueryPreview from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/QueryPreview",
  component: QueryPreview,
} as Meta<typeof QueryPreview>;

const Template: StoryFn<typeof QueryPreview> = (args) => (
  <RootLayout>
    <QueryPreview {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = queryPreviewMock;
