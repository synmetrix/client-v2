import RootLayout from "@/layouts/RootLayout";
import { Roles } from "@/types/team";
import { teams } from "@/mocks/teams";

import { Teams } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Teams",
  component: Teams,
} as Meta<typeof Teams>;

const Template: StoryFn<typeof Teams> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <RootLayout>
      <Teams
        {...args}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  teams,
  currentTeam: {
    id: "2",
    name: "My Team",
    members: [],
    role: Roles.owner,
    createdAt: "10/10/2023 8:30PM",
    updatedAt: "10/10/2023 8:30PM",
  },
};
