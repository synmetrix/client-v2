import { useForm } from "react-hook-form";

import RootLayout from "@/layouts/RootLayout";
import type { DataResource } from "@/types/access";

import AccessController from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/RolesAndAccess/AccessController",
  component: AccessController,
} as Meta<typeof AccessController>;

const resourceMock: DataResource = {
  id: "1",
  title: "github.demo.altinity.cloud",
  dataModels: [
    {
      title: "LineItems",
      measures: [{ label: "Stocks", value: "stocks" }],
      dimensions: [
        { label: "Name", value: "name" },
        { label: "Address", value: "address" },
        { label: "Stocks", value: "stocks" },
      ],
      segments: [{ label: "Stocks", value: "stocks" }],
    },
    {
      title: "Companies",
      measures: [{ label: "Stocks", value: "stocks" }],
      dimensions: [
        { label: "Name", value: "name" },
        { label: "Address", value: "address" },
        { label: "Stocks", value: "stocks" },
      ],
      segments: [{ label: "Stocks", value: "stocks" }],
    },
    {
      title: "Orders",
      measures: [{ label: "Stocks", value: "stocks" }],
      dimensions: [
        { label: "Name", value: "name" },
        { label: "Address", value: "address" },
        { label: "Stocks", value: "stocks" },
      ],
      segments: [{ label: "Stocks", value: "stocks" }],
    },
  ],
};

interface AccessForm {
  access: Record<string, string[]>;
}

const Template: StoryFn<typeof AccessController> = (args) => {
  const { control } = useForm<AccessForm>();
  return (
    <RootLayout>
      <AccessController
        {...args}
        control={control}
        resource={resourceMock}
        name="access"
      />
    </RootLayout>
  );
};
export const Default = Template.bind({});
