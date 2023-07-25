import RootLayout from "@/layouts/RootLayout";

import DataModelSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/DataModelSelection",
  component: DataModelSelection,
} as Meta<typeof DataModelSelection>;

const Template: StoryFn<typeof DataModelSelection> = (args) => {
  const [active, setActive] = useState<string>("");
  return (
    <RootLayout>
      <DataModelSelection {...args} active={active} onChange={setActive} />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: "github.demo.altinity.cloud",
  dataModels: [
    {
      title: "LineItems",
      access: "partial",
    },
    {
      title: "Companies",
      access: "no",
    },
    {
      title: "Orders",
      access: "partial",
    },
  ],
};
