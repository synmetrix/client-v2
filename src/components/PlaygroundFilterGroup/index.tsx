import { Button, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";

import PlaygroundFilterSelect from "@/components/PlaygroundFilterSelect";
import trackEvent from "@/utils/helpers/trackEvent";
import type { CubeMember, FilterMember } from "@/types/cube";

import DoubleArrowIcon from "@/assets/doublearrow.svg";

import s from "./index.module.less";

import type { FC } from "react";

// import FilterInput from 'components/PlaygroundFilterInput';

const FilterGroup: FC<FilterGroupProps> = ({
  members,
  availableMembers,
  addMemberName,
  updateMethods,
}) => {
  const { t } = useTranslation();

  return (
    <>
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
            value={t(m.operator)}
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
          {/* <FilterInput member={m} key="filterInput" updateMethods={updateMethods} addMemberName={addMemberName} /> */}
        </Space>
      ))}
    </>
  );
};

interface FilterGroupProps {
  members: FilterMember[];
  availableMembers: CubeMember[];
  addMemberName: string;
  updateMethods: {
    update: (member: FilterMember, newValue: any) => void;
    remove: (member: FilterMember) => void;
  };
}

export default FilterGroup;
