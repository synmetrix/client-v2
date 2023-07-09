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
  connectionOptions: [
    { value: "mysql", label: "MySQL", disabled: false, name: "connection" },
    { value: "psql", label: "PSQL", disabled: false, name: "connection" },
  ],
  initialValue: {
    name: "gh-api.clickhouse.tech (Yandex Demo)",
    host: "gh-api.clickhouse.tech",
    user: "user@api.clickhouse.tech",
    username: "user@api.clickhouse.tech",
    port: "12346",
    password: "132456456",
    db_username: "db_username",
    db: "db",
  },
};
