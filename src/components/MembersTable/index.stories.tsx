import RootLayout from "@/layouts/RootLayout";
import { membersMock } from "@/mocks/members";

import MembersTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/Members/MembersTable",
  component: MembersTable,
} as Meta<typeof MembersTable>;

const Template: StoryFn<typeof MembersTable> = (args) => {
  const [members, setMembers] = useState(membersMock);

  return (
    <RootLayout>
      <MembersTable
        {...args}
        members={members}
        onRoleChange={(member) => {
          const index = members.findIndex(
            (m) => m.displayName === member.displayName
          );
          const newMembers = [...members];
          newMembers[index] = member;
          setMembers(newMembers);
        }}
        onRemove={(member) =>
          setMembers((prevState) =>
            prevState.filter((m) => m.displayName !== member.displayName)
          )
        }
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});
