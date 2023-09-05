import RootLayout from "@/layouts/RootLayout";

import CodeEditor from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/CodeEditor",
  component: CodeEditor,
} as Meta<typeof CodeEditor>;

const Template: StoryFn<typeof CodeEditor> = (args) => (
  <RootLayout>
    <CodeEditor {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  files: {
    "Stackoverflow.yml": {
      name: "Stackoverflow.yml",
      value: "code code code",
      language: "yml",
    },
    "GithubEvents.js": {
      name: "GithubEvents.js",
      value: "console.log",
      language: "javascript",
    },
  },
  onRemove: console.log,
};
