import RootLayout from "@/layouts/RootLayout";

import VersionsList from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/VersionsList",
  component: VersionsList,
} as Meta<typeof VersionsList>;

const Template: StoryFn<typeof VersionsList> = (args) => (
  <RootLayout>
    <VersionsList {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  versions: [
    {
      id: "1",
      checksum: "52ac189fe94359d5aeded24a255fe5ae",
      author: {
        id: "1",
        displayName: "user name",
        email: "user@mail.com",
      },
      createdAt: "10 days ago",
      files: [
        {
          name: "Companies.yml",
          value: `Synmetrixs:
          - name: Companies
            sql: SELECT * FROM public.companies
            joins: []
        
            measures:
              - name: count
                type: count`,
          language: "yaml",
        },
        {
          name: "Companies2.yml",
          value: `Synmetrixs:
          - name: Companies
            sql: SELECT * FROM public.companies
            joins: []
        
            measures:
              - name: count
                type: count`,
          language: "yaml",
        },
      ],
    },
    {
      id: "2",
      checksum: "52ac189fe94359d5aeded24a255fe5ae",
      author: {
        id: "1",
        displayName: "user name",
        email: "user@mail.com",
      },
      createdAt: "10 days ago",
      files: [
        {
          name: "Companies.yml",
          value: `Synmetrixs:
          - name: Companies
            sql: SELECT * FROM public.companies
            joins: []
        
            measures:
              - name: count
                type: count`,
          language: "yaml",
        },
      ],
    },
  ],
  onRestore: console.log,
  onSave: () => console.log("save"),
};
