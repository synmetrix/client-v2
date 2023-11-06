import RootLayout from "@/layouts/RootLayout";
import { sqlMock } from "@/mocks/sqlResult";

import SQLRunner from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Models/SQLRunner",
  component: SQLRunner,
} as Meta<typeof SQLRunner>;

const Template: StoryFn<typeof SQLRunner> = (args) => {
  const [value, setValue] = useState<string>("SELECT id FROM users");
  return (
    <RootLayout>
      <SQLRunner {...args} onChange={setValue} value={value} />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  showData: true,
  data: sqlMock,
};
