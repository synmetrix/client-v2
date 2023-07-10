import RootLayout from "@/layouts/RootLayout";

import LanguageToggler from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/LanguageToggler",
  component: LanguageToggler,
} as Meta<typeof LanguageToggler>;

const Template: StoryFn<typeof LanguageToggler> = (args) => (
  <RootLayout>
    <LanguageToggler {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
