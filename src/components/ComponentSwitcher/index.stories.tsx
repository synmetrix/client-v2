import { Fragment } from "react";

import RootLayout from "@/layouts/RootLayout";

import ComponentSwitcher from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/ComponentSwitcher",
  component: ComponentSwitcher,
  argTypes: {
    activeItemIndex: {
      type: "string",
      description: "Switch active item",
      defaultValue: "0",
      options: ["0", "1", "2"],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof ComponentSwitcher>;

const Template: StoryFn<typeof ComponentSwitcher> = (args) => (
  <RootLayout>
    <ComponentSwitcher {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  items: [
    <Fragment key={"1"}>Component 1</Fragment>,
    <div key="2">Component 2</div>,
    "Component 3",
  ],
};
