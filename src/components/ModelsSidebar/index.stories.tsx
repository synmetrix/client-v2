import RootLayout from "@/layouts/RootLayout";
import { branchesMock } from "@/mocks/branches";
import { dataschemasMock } from "@/mocks/dataschemas";
import { dataSourcesMock } from "@/mocks/dataSources";

import ModelsSidebar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/ModelsSidebar",
  component: ModelsSidebar,
} as Meta<typeof ModelsSidebar>;

const Template: StoryFn<typeof ModelsSidebar> = (args) => (
  <RootLayout>
    <ModelsSidebar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  branches: branchesMock,
  version: "34f34fjn5g4j5g95jf3ef4t4ht5",
  docs: "https://google.com",
  files: dataschemasMock,
  dataSources: dataSourcesMock,
  onCreateFile: console.log,
  onSelectFile: console.log,
};
