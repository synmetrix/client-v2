import RootLayout from "@/layouts/RootLayout";

import ApiSetup from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/ApiSetup",
  component: ApiSetup,
} as Meta<typeof ApiSetup>;

const Template: StoryFn<typeof ApiSetup> = (args) => (
  <RootLayout>
    <ApiSetup {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  connectionString: `MYSQL  --host=gh-api.clickhouse.tech
  - -user=user@api.clickhouse.tech
  - -port=5121
  - -password=**********`,
  connectionData: [
    { label: "Host/URL", value: "username", name: "username" },
    { label: "Database", value: "db", name: "db" },
    {
      label: "Login (auto-generated)",
      value: "db_username",
      name: "db_username",
    },
    {
      label: "Password (auto-generated)",
      value: "dasdasd",
      type: "password",
      name: "password",
    },
  ],
  connectionOptions: [
    { value: "mysql", label: "MySQL", disabled: false, name: "connection" },
    { value: "psql", label: "PSQL", disabled: false, name: "connection" },
  ],
  initialValue: {
    name: "gh-api.clickhouse.tech (Yandex Demo)",
    connection: "mysql",
  },
};
