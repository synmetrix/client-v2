import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";
import { accessItems, resourceMock } from "@/mocks/access";
import { user } from "@/mocks/user";

import RoleEditor from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/RoleEditor",
  component: RoleEditor,
} as Meta<typeof RoleEditor>;

const Template: StoryFn<typeof RoleEditor> = (args) => (
  <RootLayout>
    <BasicLayout location="settings/roles_and_access" user={user}>
      <RoleEditor {...args} />
    </BasicLayout>
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  resources: resourceMock,
  accessItems,
};
