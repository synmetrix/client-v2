import RootLayout from "@/layouts/RootLayout";
import type { DataAccessOption } from "@/types/access";

import DataAccessSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/DataAccessSelection",
  component: DataAccessSelection,
} as Meta<typeof DataAccessSelection>;

const Template: StoryFn<typeof DataAccessSelection> = (args) => {
  const [value, setValue] = useState<DataAccessOption>({
    measures: [],
    dimensions: [],
    segments: [],
  });

  return (
    <RootLayout>
      <DataAccessSelection
        {...args}
        value={value}
        onChange={(v) => setValue((prevState) => ({ ...prevState, ...v }))}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  options: {
    measures: ["Stocks"],
    dimensions: ["Name", "Address", "Stocks"],
    segments: ["Stocks"],
  },
};
