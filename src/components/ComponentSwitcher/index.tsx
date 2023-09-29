import type { FC, ReactNode } from "react";

interface ComponentSwitcherProps {
  items: ReactNode[];
  activeItemIndex?: number | "all";
}

const ComponentSwitcher: FC<ComponentSwitcherProps> = ({
  items,
  activeItemIndex,
}) => {
  if (typeof activeItemIndex === "string" && activeItemIndex === "all") {
    return <>{items}</>;
  }

  return <>{items[activeItemIndex || 0]}</>;
};

export default ComponentSwitcher;
