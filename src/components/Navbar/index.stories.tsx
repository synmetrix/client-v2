import RootLayout from "@/layouts/RootLayout";

import Navbar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => (
  <RootLayout>
    <Navbar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  userMenu: [
    {
      label: "1st menu item",
      href: "/",
    },
    {
      label: "2nd menu item",
      href: "/",
    },
  ],
  teams: [
    {
      label: "1st team item",
      href: "/",
    },
    {
      label: "2nd team item",
      href: "/",
    },
  ],
};
