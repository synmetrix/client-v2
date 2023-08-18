import RootLayout from "@/layouts/RootLayout";

import TeamsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Teams/TeamsTable",
  component: TeamsTable,
} as Meta<typeof TeamsTable>;

const Template: StoryFn<typeof TeamsTable> = (args) => (
  <RootLayout>
    <TeamsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  teams: [
    {
      id: "1",
      name: "Developers",
      members: [
        {
          id: "1",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "2",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "3",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "4",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "5",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "6",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
      ],
      createdAt: "10/10/2023 8:30PM",
    },
    {
      id: "2",
      name: "AI Science Team",
      members: [
        {
          id: "1",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "2",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
        {
          id: "3",
          displayName: "User Name",
          email: "useremail@mail/com",
        },
      ],
      createdAt: "10/10/2023 8:30PM",
    },
  ],
  currentTag: "1",
};
