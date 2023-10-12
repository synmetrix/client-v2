import type { CubeMember } from "@/types/cube";
import usePlayground from "@/hooks/usePlayground";
import RootLayout from "@/layouts/RootLayout";
import { availableQueryMembers, dataSectionProps, meta } from "@/mocks/explore";

import ExploreFiltersSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreFiltersSection",
  component: ExploreFiltersSection,
} as Meta<typeof ExploreFiltersSection>;

const Template: StoryFn<typeof ExploreFiltersSection> = (args) => {
  const {
    selectedQueryMembers = {},
    analyticsQuery: { updateMember },
  } = usePlayground({
    dataSourceId: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    editId: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    meta,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    updateMember("filters", (member: CubeMember) => ({
      dimension: member.dimension?.name,
      operator: member.operator,
      values: member.values,
    })).add({
      dimension: {
        isVisible: true,
        name: "Airports.country",
        shortTitle: "Country",
        suggestFilterValues: true,
        title: "Airports Country",
        type: "string",
      },
    } as CubeMember);
  }, [updateMember]);

  return (
    <RootLayout>
      <ExploreFiltersSection
        {...args}
        isActive={isActive}
        selectedQueryMembers={selectedQueryMembers}
        onToggleSection={() => setIsActive(!isActive)}
        onMemberChange={updateMember}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers,
  state: dataSectionProps.state,
};
