import { Form } from "antd";
import { useForm } from "react-hook-form";

import RootLayout from "@/layouts/RootLayout";

import Input from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Input",
  component: Input,
  argTypes: {
    fieldType: {
      type: "string",
      description: "Field type",
      defaultValue: "text",
      options: [
        "text",
        "select",
        "textarea",
        "password",
        "file",
        "radio",
        "checkbox",
      ],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof Input>;

interface FormType {
  test: string;
}

const Template: StoryFn<typeof Input> = (args) => {
  const { control } = useForm<FormType>();

  return (
    <RootLayout>
      <Form>
        <Input<FormType> {...args} name="test" control={control} />
      </Form>
    </RootLayout>
  );
};

export const Default = Template.bind({});
Default.args = {
  fieldType: "text",
  label: "test",
  placeholder: "test",
  options: [
    {
      label: "option1",
      value: "option1",
    },
    {
      label: "option2",
      value: "option2",
    },
  ],
};
