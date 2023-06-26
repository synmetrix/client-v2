import RootLayout from "@/layouts/RootLayout";

import Postgres from "../../assets/databases/postgre.svg";

import FormTile from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/FormTile",
  component: FormTile,
  argTypes: {
    active: {
      type: "boolean",
      description: "Activity state",
      defaultValue: false,
      options: [true, false],
      control: {
        type: "radio",
      },
    },
  },
} as Meta<typeof FormTile>;

const Template: StoryFn<typeof FormTile> = (args) => (
  <RootLayout>
    <FormTile {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
Default.args = {
  active: true,
  title: "Postgres",
  icon: <Postgres />,
};
