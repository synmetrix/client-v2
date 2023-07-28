import { MemoryRouter } from "@vitjs/runtime";

import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";
import { accessItems, resourceMock } from "@/mocks/access";

import RoleEditor from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/RoleEditor",
  component: RoleEditor,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/settings/roles_and_access"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof RoleEditor>;

const Template: StoryFn<typeof RoleEditor> = (args) => (
  <RootLayout>
    <BasicLayout loggedIn>
      <RoleEditor {...args} />
    </BasicLayout>
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  resources: resourceMock,
  accessItems,
};
