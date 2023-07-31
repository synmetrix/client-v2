import RootLayout from "@/layouts/RootLayout";
import { accessItems, resourceMock } from "@/mocks/access";

import RoleEditor from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Settings/RoleEditor",
  component: RoleEditor,
} as Meta<typeof RoleEditor>;

const Template: StoryFn<typeof RoleEditor> = (args) => (
  <RootLayout>
    <RoleEditor {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  resources: resourceMock,
  accessItems,
};
