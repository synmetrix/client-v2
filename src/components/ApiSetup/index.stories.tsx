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
    { label: "Host/URL", value: "username" },
    { label: "Database", value: "db" },
    { label: "Login (auto-generated)", value: "db_username" },
    { label: "Password (auto-generated)", value: "dasdasd", type: "password" },
  ],
  connectionOptions: [
    { value: "mysql", label: "MySQL", disabled: false },
    { value: "psql", label: "PSQL", disabled: false },
  ],
};
