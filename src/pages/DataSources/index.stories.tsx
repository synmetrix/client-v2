import RootLayout from "@/layouts/RootLayout";
import { dataSourcesMock } from "@/mocks/dataSources";

import { DataSources } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/DataSources",
  component: DataSources,
} as Meta<typeof DataSources>;

const Template: StoryFn<typeof DataSources> = (args) => (
  <RootLayout>
    <DataSources {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  dataSources: dataSourcesMock,
};
