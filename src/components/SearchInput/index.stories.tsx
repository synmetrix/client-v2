import RootLayout from "@/layouts/RootLayout";

import SearchInput from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
} as Meta<typeof SearchInput>;

const Template: StoryFn<typeof SearchInput> = (args) => {
  const [value, setValue] = useState<string>("");
  return (
    <RootLayout>
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        placeholder="Placeholder"
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});
