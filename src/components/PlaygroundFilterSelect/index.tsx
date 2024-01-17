import { Select } from "antd";
import { useDebounceFn } from "ahooks";
import { useTranslation } from "react-i18next";

import type { CubeMember } from "@/types/cube";

import ArrowBottom from "@/assets/arrow-big.svg";

import type { FC } from "react";

interface PlaygroundFilterSelectProps {
  availableMembers: CubeMember[];
  onChange: (member?: CubeMember) => void;
  value?: string;
}

const PlaygroundFilterSelect: FC<PlaygroundFilterSelectProps> = ({
  availableMembers,
  value,
  onChange,
}) => {
  const { t } = useTranslation(["explore"]);

  const [data, setData] = useState(availableMembers);

  const { run: handleSearch } = useDebounceFn(
    (val: string) => {
      let res = availableMembers;
      if (val) {
        res = availableMembers.filter(
          (m) => m.title && m.title.toLowerCase().includes(val)
        );
      }

      setData(res);
    },
    { wait: 200 }
  );

  return (
    <Select
      showSearch
      value={value || undefined}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      style={{ width: 263 }}
      onChange={(val) => onChange(data.find((d) => d.name === val))}
      placeholder={t("filters.filter_name")}
      size="large"
      suffixIcon={<ArrowBottom />}
    >
      {data.map((d) => (
        <Select.Option key={d.title} value={d.name}>
          {d.title}
        </Select.Option>
      ))}
    </Select>
  );
};

export default PlaygroundFilterSelect;
