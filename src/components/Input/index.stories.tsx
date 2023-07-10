import { useForm } from "react-hook-form";

import RootLayout from "@/layouts/RootLayout";

import Input from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Input",
  component: Input,
} as Meta<typeof Input>;

interface Form {
  test: string;
}

const Template: StoryFn<typeof Input> = () => {
  const { control } = useForm<Form>();

  return (
    <RootLayout>
      <Input<Form> name="test" defaultValue="test" control={control} />
    </RootLayout>
  );
};

export const Default = Template.bind({});
