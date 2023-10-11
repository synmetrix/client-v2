import { Button, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";

import PlaygroundFilterSelect from "@/components/PlaygroundFilterSelect";
import FilterInput from "@/components/PlaygroundFilterInput";
import trackEvent from "@/utils/helpers/trackEvent";
import type { CubeMember } from "@/types/cube";

import DoubleArrowIcon from "@/assets/doublearrow.svg";

import s from "./index.module.less";

import type { FC } from "react";

const FilterGroup: FC<FilterGroupProps> = ({
  members,
  availableMembers,
  addMemberName,
  updateMethods,
}) => {
  const { t } = useTranslation(["common"]);

  return (
    <Space direction="vertical" size={16} className={s.space}>
      {members.map((m) => (
        <Space key={m.index} size={10} align="center">
          <Button
            danger
            icon={<CloseOutlined />}
            size="large"
            className={s.remove}
            onClick={() => {
              trackEvent("Remove Member", { memberName: addMemberName });
              updateMethods.remove(m);
            }}
          />
          <PlaygroundFilterSelect
            availableMembers={availableMembers}
            value={t(m.dimension.title)}
            onChange={(dimension) => {
              trackEvent("Update Member", { memberName: addMemberName });
              if (dimension) updateMethods.update(m, { ...m, dimension });
            }}
          />
          <Select
            value={t(`common:operators.${m.operator}`, m.operator)}
            onChange={(operator) => updateMethods.update(m, { ...m, operator })}
            className={s.select}
            size="large"
            suffixIcon={<DoubleArrowIcon />}
          >
            {m.operators.map((operator) => (
              <Select.Option key={operator.name} value={operator.name}>
                {t(operator.title)}
              </Select.Option>
            ))}
          </Select>
          <FilterInput
            member={m}
            key="filterInput"
            updateMethods={updateMethods}
            addMemberName={addMemberName}
          />
        </Space>
      ))}
    </Space>
  );
};

interface FilterGroupProps {
  members: (CubeMember | CubeMember)[];
  availableMembers: CubeMember[];
  addMemberName: string;
  updateMethods: {
    update: (member: CubeMember, newValue: any) => void;
    remove: (member: CubeMember) => void;
  };
}

export default FilterGroup;
