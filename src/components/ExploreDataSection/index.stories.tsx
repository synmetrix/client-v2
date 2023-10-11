import RootLayout from "@/layouts/RootLayout";
import { dataSectionProps } from "@/mocks/explore";
import { getTitle } from "@/utils/helpers/getTitles";

import ExploreDataSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreDataSection",
  component: ExploreDataSection,
} as Meta<typeof ExploreDataSection>;

const Template: StoryFn<typeof ExploreDataSection> = (args) => {
  const [settings, setSettings] = useState({
    hideIndexColumn: false,
    hideCubeNames: false,
  });

  const [columns, setColumns] = useState(args.queryState.columns);

  const [isActive, setIsActive] = useState(false);

  const onQueryChange = (type: string, value: boolean) => {
    if (settings[type as keyof typeof settings] === value) return;

    setSettings((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    setColumns(
      args.queryState.columns.map((c) => {
        const header = c["Header" as keyof typeof c] as string;
        const newHeader = settings.hideCubeNames
          ? header.split(" ")[1]
          : header;
        return { ...c, Header: newHeader };
      })
    );
  }, [args.queryState.columns, args.queryState.rows, settings]);

  return (
    <RootLayout>
      <ExploreDataSection
        {...args}
        isActive={isActive}
        onToggleSection={() => setIsActive((prev) => !prev)}
        onQueryChange={onQueryChange}
        queryState={{ ...args.queryState, settings, columns }}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = dataSectionProps;
