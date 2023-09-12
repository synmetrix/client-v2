import { MemoryRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";

import MenuView from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/MenuView",
  component: MenuView,
} as Meta<typeof MenuView>;

const Template: StoryFn<typeof MenuView> = (args) => (
  <MemoryRouter>
    <RootLayout>
      <MenuView {...args} />
    </RootLayout>
  </MemoryRouter>
);

export const Default = Template.bind({});

Default.args = {
  nodes: [
    {
      title: "test1",
      key: "test1",
      path: "/",
    },
    {
      title: "test2",
      key: "test2",
      path: "/",
    },
    {
      title: "test3",
      key: "test3",
      children: [
        {
          title: "test4",
          key: "test4",
        },
      ],
    },
  ],
};
