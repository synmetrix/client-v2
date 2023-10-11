import RootLayout from "@/layouts/RootLayout";
import { dataSectionProps } from "@/mocks/explore";

import ExploreDataSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreDataSection",
  component: ExploreDataSection,
} as Meta<typeof ExploreDataSection>;

const Template: StoryFn<typeof ExploreDataSection> = (args) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <RootLayout>
      <ExploreDataSection
        {...args}
        isActive={isActive}
        onToggleSection={() => setIsActive((prev) => !prev)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = dataSectionProps;
