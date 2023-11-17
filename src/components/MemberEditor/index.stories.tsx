import RootLayout from "@/layouts/RootLayout";
import { Roles } from "@/types/team";

import MemberEditor from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Members/MemberEditor",
  component: MemberEditor,
} as Meta<typeof MemberEditor>;

const Template: StoryFn<typeof MemberEditor> = (args) => (
  <RootLayout>
    <MemberEditor {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  member: {
    id: "0316ddaa-20ad-4461-ab3a-6559ca3bbf95",
    email: "demo@mlcraft.io",
    displayName: "demo@mlcraft.io",
    accessList: null,
    role: { id: "378c5f55-6b7e-4dee-953d-a9cc172b9e7c", name: Roles.member },
  },
  accessLists: [],
  currentRole: Roles.owner,
};
