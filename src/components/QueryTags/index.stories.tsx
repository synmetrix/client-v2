import RootLayout from "@/layouts/RootLayout";
import { queryStateMock } from "@/mocks/queryState";

import QueryTags from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/QueryTags",
  component: QueryTags,
} as Meta<typeof QueryTags>;

const Template: StoryFn<typeof QueryTags> = (args) => (
  <RootLayout>
    <QueryTags {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  content: queryStateMock.measures,
  type: "measure",
};
