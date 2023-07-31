import RootLayout from "@/layouts/RootLayout";
import { accessItems, resourceMock } from "@/mocks/access";

import RoleForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/RoleForm",
  component: RoleForm,
} as Meta<typeof RoleForm>;

const Template: StoryFn<typeof RoleForm> = (args) => (
  <RootLayout>
    <RoleForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  dataSourceAccess: accessItems,
  resources: resourceMock,
  onSubmit: console.log,
};
