import RootLayout from "@/layouts/RootLayout";

import Header from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Header",
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => (
  <RootLayout>
    <Header {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

export const WithAuth = Template.bind({});
WithAuth.args = {
  user: {
    fullName: "User Name",
    teams: [
      {
        label: "team1",
        href: "",
      },
    ],
  },
};

export const SignIn = Template.bind({});
SignIn.args = {
  location: "signup",
};

export const SignUp = Template.bind({});
SignUp.args = {
  location: "signin",
};
