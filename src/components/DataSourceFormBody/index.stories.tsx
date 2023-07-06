import RootLayout from "@/layouts/RootLayout";
import type { DataSourceForm } from "@/types/dataSource";

import DataSourceFormBody from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/DataSourceFormBody",
  component: DataSourceFormBody,
} as Meta<typeof DataSourceFormBody>;

const Template: StoryFn<typeof DataSourceFormBody> = (args) => {
  const [formData, setFormData] = useState<DataSourceForm>({});
  const [step, setStep] = useState<number>(0);

  return (
    <RootLayout>
      <DataSourceFormBody
        {...args}
        step={step}
        setStep={setStep}
        formState={formData}
        setState={setFormData || console.log}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});
