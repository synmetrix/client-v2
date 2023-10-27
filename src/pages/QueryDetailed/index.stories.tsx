import { queryDetailedMock } from "@/mocks/queryDetailed";
import RootLayout from "@/layouts/RootLayout";

import { QueryDetailed } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Logs/QueryDetailed",
  component: QueryDetailed,
} as Meta<typeof QueryDetailed>;

const Template: StoryFn<typeof QueryDetailed> = (args) => (
  <RootLayout>
    <QueryDetailed {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

type DefaultProps = Parameters<typeof QueryDetailed>[0];

Default.args = queryDetailedMock as unknown as DefaultProps;
