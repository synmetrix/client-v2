import { DownOutlined } from "@ant-design/icons";

import PopoverButton from "@/components/PopoverButton";
import type { DataSourceInfo } from "@/types/dataSource";

import s from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

interface DataSourcesMenuProps {
  entities: DataSourceInfo[];
  selectedId?: string | null;
  onChange?: (id: string) => void;
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
      <span>{entities[selectedIdx]?.name || "Select datasource"}</span>
      <PopoverButton
        icon={<DownOutlined />}
        popoverType="dropdown"
        trigger={["hover"]}
        disabled={!items || items.length < 2}
        menu={{
          items,
          onClick: ({ key }) => onChange?.(key),
        }}
        buttonProps={{
          type: "text",
        }}
      />
    </div>
  );
};

export default DataSourcesMenu;
