import { Typography, Space, Input, Checkbox } from "antd";

import styles from "./index.module.less";

import type { ChangeEvent, FC } from "react";

const { Text } = Typography;

export type DataAccessOption = Partial<
  Record<"measures" | "deminsions" | "segments", string[]>
>;

interface DataAccessSelectionProps {
  options: DataAccessOption;
  value?: DataAccessOption;
  onChange?: (value: DataAccessOption) => void;
}

const DataAccessSelection: FC<DataAccessSelectionProps> = ({
  options,
  value,
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const filterOptions = (option?: string[]) => {
    const res = option?.filter((m) => m.toLowerCase().includes(searchValue));
    return res && res.length > 0 ? res : undefined;
  };

  const measures = filterOptions(options.measures),
    deminsions = filterOptions(options.deminsions),
    segments = filterOptions(options.segments);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value.trim().toLowerCase());

  const isAllSelected = () => {
    if (!value) return false;
    return Object.keys(options).every((k) => {
      const key = k as keyof DataAccessOption;
      return options[key]?.every((o) => value[key]?.includes(o));
    });
  };

  const onSelectAll = () => {
    if (isAllSelected()) {
      onChange?.({ measures: [], deminsions: [], segments: [] });
    } else {
      onChange?.({ measures, deminsions, segments });
    }
  };

  const onSelect = (newValue: string[], key: keyof DataAccessOption) => {
    if (!value) return;

    if (!newValue.length && searchValue) {
      value[key] = value[key]?.filter(
        (o) => !o.toLowerCase().includes(searchValue)
      );
      return onChange?.(value);
    }

    if (!newValue.length) {
      value[key] = [];
      return onChange?.(value);
    }

    value[key] = newValue;
    onChange?.(value);
  };

  return (
    <Space className={styles.wrapper} size={16} direction="vertical">
      <Text className={styles.title}>Measures/dimensions/segments</Text>

      <Input
        className={styles.input}
        placeholder="Placeholder"
        size="large"
        value={searchValue}
        onChange={onSearch}
      />

      <Space size={16} direction="vertical">
        <Checkbox checked={isAllSelected()} onChange={onSelectAll}>
          Select all
        </Checkbox>

        <Space size={8} direction="vertical">
          {measures && (
            <>
              <Text className={styles.groupTitle}>measures</Text>
              <Checkbox.Group
                className={styles.checkboxGroup}
                options={measures}
                value={value?.measures}
                onChange={(v) => onSelect(v as string[], "measures")}
              />
            </>
          )}

          {deminsions && (
            <>
              <Text className={styles.groupTitle}>deminsions</Text>
              <Checkbox.Group
                className={styles.checkboxGroup}
                options={deminsions}
                value={value?.deminsions}
                onChange={(v) => onSelect(v as string[], "deminsions")}
              />
            </>
          )}

          {segments && (
            <>
              <Text className={styles.groupTitle}>segments</Text>
              <Checkbox.Group
                className={styles.checkboxGroup}
                options={segments}
                value={value?.segments}
                onChange={(v) => onSelect(v as string[], "segments")}
              />
            </>
          )}
        </Space>
      </Space>
    </Space>
  );
};

export default DataAccessSelection;
