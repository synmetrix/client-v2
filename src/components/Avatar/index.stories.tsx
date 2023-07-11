import RootLayout from "@/layouts/RootLayout";

import Avatar from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Avatar",
  component: Avatar,
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => (
  <RootLayout>
    <Avatar {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  username: "user name",
};

export const Image = Template.bind({});

Image.args = {
  username: "user name",
  img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
};
