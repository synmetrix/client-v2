import RootLayout from "@/layouts/RootLayout";
import { dataschemasMock } from "@/mocks/dataschemas";

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
  schemas: dataschemasMock,
};
