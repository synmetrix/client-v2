import RootLayout from "@/layouts/RootLayout";

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
  branches: ["main-default", "dev"],
  version: "34f34fjn5g4j5g95jf3ef4t4ht5",
  docs: "https://google.com",
  files: ["GithubEvents.yml", "Stackoverflow.yml", "Stock.yml"],
  onCreateFile: console.log,
  onSelectFile: console.log,
  onSetDefaultVersion: console.log,
};
