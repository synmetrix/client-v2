import PopoverButton from "@/components/PopoverButton";
import type { DataSourceInfo } from "@/types/dataSource";

import ArrowIcon from "@/assets/arrow-small.svg";

import s from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

interface DataSourcesMenuProps {
  entities: DataSourceInfo[];
  selectedId?: string | null;
  onChange?: (dataSource: DataSourceInfo | null) => void;
}

const DataSourcesMenu: FC<DataSourcesMenuProps> = ({
  entities,
  selectedId,
  onChange,
}) => {
  const items: MenuProps["items"] = entities.map((d) => ({
    key: d.id || d.name,
    label: d.name,
  }));

  const selectedIdx = items.findIndex((i) => i?.key === selectedId);

  if (selectedIdx > -1) {
    items.splice(selectedIdx, 1);
  }

  return (
    <div className={s.wrapper}>
      <span className={s.value} title={entities[selectedIdx]?.name}>
        {entities[selectedIdx]?.name || "Select datasource"}
      </span>
      <PopoverButton
        icon={<ArrowIcon style={{ display: "block" }} />}
        popoverType="dropdown"
        trigger={["hover"]}
        disabled={!items || items.length < 1}
        menu={{
          items,
          onClick: ({ key }) =>
            onChange?.(entities.find((e) => e.id === key) || null),
        }}
        buttonProps={{
          type: "text",
        }}
      />
    </div>
  );
};

export default DataSourcesMenu;
