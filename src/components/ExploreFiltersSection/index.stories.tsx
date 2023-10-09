import RootLayout from "@/layouts/RootLayout";
import {
  availableQueryMembers,
  dataSectionProps,
  selectedQueryMembers,
} from "@/mocks/explore";

import ExploreFiltersSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreFiltersSection",
  component: ExploreFiltersSection,
} as Meta<typeof ExploreFiltersSection>;

const Template: StoryFn<typeof ExploreFiltersSection> = (args) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <RootLayout>
      <ExploreFiltersSection
        {...args}
        isActive={isActive}
        onToggleSection={() => setIsActive(!isActive)}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers,
  selectedQueryMembers,
  state: dataSectionProps.state,
};
