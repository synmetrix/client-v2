import RootLayout from "@/layouts/RootLayout";

import MembersTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/Members/MembersTable",
  component: MembersTable,
} as Meta<typeof MembersTable>;

const data = [
  {
    id: "1",
    fullName: "Ivan Fokeev1",
    email: "mail@synmetrix1.com",
    role: "Owner",
  },
  {
    id: "2",
    fullName: "Ivan Fokeev2",
    email: "mail@synmetrix2.com",
    role: "Owner",
  },
  {
    id: "3",
    fullName: "Ivan Fokeev3",
    email: "mail@synmetrix3.com",
    role: "Owner",
  },
  {
    id: "4",
    fullName: "Ivan Fokeev4",
    email: "mail@synmetrix4.com",
    role: "Owner",
  },
  {
    id: "5",
    fullName: "Ivan Fokeev5",
    email: "mail@synmetrix5.com",
    role: "Owner",
  },
  {
    id: "6",
    fullName: "Ivan Fokeev6",
    email: "mail@synmetrix6.com",
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
