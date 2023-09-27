import RootLayout from "@/layouts/RootLayout";

import SimpleForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/SimpleForm",
  component: SimpleForm,
} as Meta<typeof SimpleForm>;

const Template: StoryFn<typeof SimpleForm> = (args) => (
  <RootLayout>
    <SimpleForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  config: {
    input1: {
      name: "input1",
      label: "input1",
      section: "section",
    },
    input2: {
      name: "input2",
      label: "input2",
      section: "section2",
    },
    input3: {
      name: "input3",
      label: "input3",
      section: "section",
      subSection: "subsection",
      size: "small",
    },
  },
  submitText: "submit",
  layout: "vertical",
  onSubmit: console.log,
};
