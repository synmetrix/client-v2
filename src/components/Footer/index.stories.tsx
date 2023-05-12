import RootLayout from "@/layouts/RootLayout";

import Footer from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Footer",
  component: Footer,
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = (args) => (
  <RootLayout>
    <Footer {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
