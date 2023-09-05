import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import { SqlApi } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/DataSources",
  component: SqlApi,
} as Meta<typeof SqlApi>;

const Template: StoryFn<typeof SqlApi> = (args) => (
  <RootLayout>
    <SqlApi {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {};
