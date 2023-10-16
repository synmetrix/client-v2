import RootLayout from "@/layouts/RootLayout";
import { dataSectionProps, meta } from "@/mocks/explore";
import usePlayground from "@/hooks/usePlayground";

import ExploreDataSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreDataSection",
  component: ExploreDataSection,
} as Meta<typeof ExploreDataSection>;

const Template: StoryFn<typeof ExploreDataSection> = (args) => {
  const [isActive, setIsActive] = useState(false);
  const { state: explorationState, dispatchSettings } = usePlayground({
    dataSourceId: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    editId: "35c549a8-c38a-4ff1-90a5-b3081a35aa93",
    meta,
  });

  const onQueryChange = useCallback(
    (type: string, ...argss: any) => {
      switch (type) {
        case "hideCubeNames":
          dispatchSettings({ type: "hideCubeNames", value: argss[0] });
          break;
        case "hideIndexColumn":
          dispatchSettings({ type: "hideIndexColumn", value: argss[0] });
          break;
        default:
          return () => {};
      }
    },
    [dispatchSettings]
  );

  return (
    <RootLayout>
      <ExploreDataSection
        {...args}
        isActive={isActive}
        onToggleSection={() => setIsActive((prev) => !prev)}
        onQueryChange={onQueryChange}
        queryState={explorationState}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = dataSectionProps;
