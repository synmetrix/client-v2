import RootLayout from "@/layouts/RootLayout";

import RestAPI from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/DataSources/NoDataSource",
  component: RestAPI,
} as Meta<typeof RestAPI>;

const Template: StoryFn<typeof RestAPI> = () => (
  <RootLayout>
    <RestAPI />
  </RootLayout>
);

export const Default = Template.bind({});
