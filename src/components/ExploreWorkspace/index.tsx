import ExploreDataSection from "@/components/ExploreDataSection";
import { dataSectionProps } from "@/mocks/explore";

import type { FC } from "react";

const ExploreWorkSpace: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const onRunQuery = () => {
    console.log("run query");
  };

  const onToggleSection = () => setIsActive(!isActive);

  const onQueryChange = useCallback((type: string, ...args: any) => {
    switch (type) {
      case "limit":
        console.log(...args);
        break;
      case "offset":
        console.log(...args);
        break;
      case "page":
        console.log(...args);
        break;
      case "order":
        return () => {
          console.log("setSortBy");
        };
      case "hideCubeNames":
        console.log({ type: "hideCubeNames", value: args[0] });
        break;
      case "hideIndexColumn":
        console.log({ type: "hideIndexColumn", value: args[0] });
        break;
      default:
        return () => {};
    }

    return null;
  }, []);

  return (
    <ExploreDataSection
      key={"dataSec"}
      onQueryChange={onQueryChange}
      header={undefined}
      {...dataSectionProps}
      isActive={isActive}
      onExec={onRunQuery}
      onToggleSection={onToggleSection}
      onSectionChange={onToggleSection}
    />
  );
};

export default ExploreWorkSpace;
