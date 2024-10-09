import RootLayout from "@/layouts/RootLayout";
import { credentialsMock } from "@/mocks/credentials";

import { CredentialsPage } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/Credentials",
  component: CredentialsPage,
} as Meta<typeof CredentialsPage>;

const Template: StoryFn<typeof CredentialsPage> = (args) => (
  <RootLayout>
    <CredentialsPage {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  credentials: credentialsMock,
};
