import RootLayout from "@/layouts/RootLayout";

import DataSourceFormBody from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Onboarding/DataSourceFormBody",
  component: DataSourceFormBody,
} as Meta<typeof DataSourceFormBody>;

const Template: StoryFn<typeof DataSourceFormBody> = (args) => {
  return (
    <RootLayout>
      <DataSourceFormBody {...args} />
    </RootLayout>
  );
};

export const Default = Template.bind({});
Default.args = {
  onFinish: console.log,
  activeStep: 0,
  formState: {
    step0: undefined,
    step1: undefined,
    step2: undefined,
    step3: undefined,
  },
};
