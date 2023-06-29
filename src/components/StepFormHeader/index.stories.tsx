import RootLayout from "@/layouts/RootLayout";

import StepFormHeader from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/StepFormHeader",
  component: StepFormHeader,
} as Meta<typeof StepFormHeader>;

const Template: StoryFn<typeof StepFormHeader> = (args) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <RootLayout>
      <StepFormHeader
        {...args}
        currentStep={currentStep}
        onChange={(i) => setCurrentStep(i)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  steps: [
    "Connect Data Source",
    "Data Source Setup",
    "Generate Data Model Files",
    "SQL API",
  ],
};
