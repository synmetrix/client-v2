import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";

import SignUp from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/SignUp",
  component: SignUp,
} as Meta<typeof SignUp>;

const Template: StoryFn<typeof SignUp> = (args) => (
  <RootLayout>
    <BasicLayout withLogo>
      <SignUp {...args} />
    </BasicLayout>
  </RootLayout>
);

export const Default = Template.bind({});
