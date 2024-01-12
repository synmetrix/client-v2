import RootLayout from "@/layouts/RootLayout";
import { dataSourcesMock } from "@/mocks/dataSources";

import BranchSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/BranchSelection",
  component: BranchSelection,
} as Meta<typeof BranchSelection>;

const Template: StoryFn<typeof BranchSelection> = (args) => (
  <RootLayout>
    <BranchSelection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  branches: dataSourcesMock[0].branches,
};
