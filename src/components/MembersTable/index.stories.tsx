import RootLayout from "@/layouts/RootLayout";

import MembersTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/Members/MembersTable",
  component: MembersTable,
} as Meta<typeof MembersTable>;

const data = [
  {
    fullName: "Ivan Fokeev1",
    email: "mail@synmetrix.com",
    role: "Owner",
  },
  {
    fullName: "Ivan Fokeev2",
    email: "mail@synmetrix.com",
    role: "Owner",
  },
  {
    fullName: "Ivan Fokeev3",
    email: "mail@synmetrix.com",
    role: "Owner",
  },
  {
    fullName: "Ivan Fokeev4",
    email: "mail@synmetrix.com",
    role: "Owner",
  },
  {
    fullName: "Ivan Fokeev5",
    email: "mail@synmetrix.com",
    role: "Owner",
  },
  {
    fullName: "Ivan Fokeev6",
    email: "mail@synmetrix.com",
    role: "role",
  },
];

const Template: StoryFn<typeof MembersTable> = (args) => {
  const [members, setMembers] = useState(data);

  return (
    <RootLayout>
      <MembersTable
        {...args}
        members={members}
        onRoleChange={(member) => {
          const index = members.findIndex(
            (m) => m.fullName === member.fullName
          );
          const newMembers = [...members];
          newMembers[index] = member;
          setMembers(newMembers);
        }}
        onRemove={(member) =>
          setMembers((prevState) =>
            prevState.filter((m) => m.fullName !== member.fullName)
          )
        }
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});
