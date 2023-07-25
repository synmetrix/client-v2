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
  title: "github.demo.altinity.cloud",
  dataModels: [
    {
      title: "LineItems",
      measures: ["Stocks"],
      dimensions: ["Name", "Address", "Stocks"],
      segments: ["Stocks"],
    },
    {
      title: "Companies",
      measures: ["Stocks"],
      dimensions: ["Name", "Address", "Stocks"],
      segments: ["Stocks"],
    },
    {
      title: "Orders",
      measures: ["Stocks"],
      dimensions: ["Name", "Address", "Stocks"],
      segments: ["Stocks"],
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
