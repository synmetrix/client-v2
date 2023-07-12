import RootLayout from "@/layouts/RootLayout";

import BurgerMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/BurgerMenu",
  component: BurgerMenu,
} as Meta<typeof BurgerMenu>;

const Template: StoryFn<typeof BurgerMenu> = (args) => (
  <RootLayout>
    <BurgerMenu {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  children: "body",
};
