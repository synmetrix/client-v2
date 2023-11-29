import { Collapse, Badge, Radio, Input, Alert } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import useCubesList from "@/hooks/useCubesList";
import ExploreCubesSection from "@/components//ExploreCubesSection";
import type { Cube, CubeMember } from "@/types/cube";
import type { DataSchemaValidation } from "@/types/exploration";

import SearchIcon from "@/assets/search.svg";

import styles from "./index.module.less";

import type { ChangeEventHandler, FC, ReactNode } from "react";
import type { RadioChangeEvent, AlertProps } from "antd";

interface ExploreCubesProps {
  onMemberSelect: (
    memberType?: string,
    toQuery?: (member: CubeMember) => any
  ) => {
    add: (member: CubeMember) => void;
    remove: (member: CubeMember) => void;
    update: (member: CubeMember, newValue: any) => void;
  };
  availableQueryMembers: Record<
    string,
    Record<string, Record<string, CubeMember>>
  >;
  selectedQueryMembers: Record<string, CubeMember[]>;
  dataSchemaValidation?: DataSchemaValidation;
  header?: ReactNode;
}

const { Panel } = Collapse;

export const SHOWN_CATEGORIES = ["dimensions", "measures", "segments"];

const ExploreCubes: FC<ExploreCubesProps> = ({
  onMemberSelect,
  availableQueryMembers,
  selectedQueryMembers,
  dataSchemaValidation,
  header,
}) => {
  const { t } = useTranslation(["explore", "common"]);
  const responsive = useResponsive();

  const { state, setState } = useCubesList({
    query: "",
    availableQueryMembers,
    categories: SHOWN_CATEGORIES,
    openedCubes: [],
  });

  const options = useMemo(
    () =>
      Object.keys(state.members || {}).map((cube) => {
        const members = state.members[cube];

        const hasMembers = Object.values(members).some(
          (category: Cube) => !!Object.values(category).length
        );

        if (!members || !hasMembers) {
          return null;
        }

        const cubeSelectedItems = Object.values(selectedQueryMembers || {})
          .flat()
          .filter(
            (m) =>
              (m.name || "").split(".")[0].toLowerCase() === cube.toLowerCase()
          );

        const cubeSelectedCount = cubeSelectedItems.reduce(
          (acc: CubeMember[], item: CubeMember) => {
            const isMemberExists = !!acc.find(
              (accItem: CubeMember) => accItem.name === item.name
            );

            if (isMemberExists) {
              return acc;
            }

            acc.push(item);
            return acc;
          },
          []
        ).length;

        return (
          <Panel
            key={cube}
            header={cube}
            className={styles.panel}
            extra={
              <Badge
                count={cubeSelectedCount}
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "0 10px",
                }}
              />
            }
          >
            <ExploreCubesSection
              selectedMembers={selectedQueryMembers}
              members={members}
              onMemberSelect={onMemberSelect}
            />
          </Panel>
        );
      }),
    [onMemberSelect, selectedQueryMembers, state.members]
  );

  const onSearch = (query: string, categories: string[]) => {
    let openedCubes: string[] = [];

    // if query or specific category then open cubes
    if (query || categories.length === 1) {
      openedCubes = Object.keys(state.members);
    }

    setState((prev) => ({
      ...prev,
      query,
      categories,
      openedCubes,
    }));
  };

  let timer: any;
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    clearTimeout(timer);
    timer = setTimeout(() => onSearch(value, state.categories), 300);
  };

  const onFilterChange = (e: RadioChangeEvent) => {
    const { value } = e.target;

    setState((prev) => ({ ...prev, radioValue: value }));

    const onButtonClick = {
      all: () => onSearch(state.query, SHOWN_CATEGORIES),
      dimensions: () => onSearch(state.query, ["dimensions"]),
      measures: () => onSearch(state.query, ["measures"]),
    };

    onButtonClick[value as keyof typeof onButtonClick]();
  };

  const onCollapse = (activeKey: string | string[]) => {
    setState((prev) => ({
      ...prev,
      openedCubes: Array.isArray(activeKey) ? activeKey : [activeKey],
    }));
  };

  const dataSchemaError: AlertProps = { type: "error", message: "" };
  if (dataSchemaValidation?.error) {
    dataSchemaError.message = `${t("Bad Data Schema")}.\n${
      dataSchemaValidation.error.message
    }`;
  }

  return (
    <div>
      {header && <div className={styles.header}>{header}</div>}

      <div>
        <Radio.Group
          value={state.radioValue}
          size="small"
          onChange={onFilterChange}
          className={styles.buttonGroup}
        >
          <Radio.Button className={styles.radioButton} type="text" value="all">
            {t("All")}
          </Radio.Button>
          <Radio.Button
            className={styles.radioButton}
            type="text"
            value="dimensions"
          >
            {t("Dimensions")}
          </Radio.Button>
          <Radio.Button
            className={styles.radioButton}
            type="text"
            value="measures"
          >
            {t("Measures")}
          </Radio.Button>
        </Radio.Group>
      </div>

      <div className={cn(styles.body, !responsive.lg && styles.bodyMobile)}>
        <div className={styles.cubes}>
          <Input
            className={styles.searchInput}
            bordered={false}
            prefix={<SearchIcon />}
            placeholder="Find..."
            onChange={onChange}
            allowClear
          />

          {dataSchemaValidation?.error && <Alert {...dataSchemaError} />}
          <Collapse
            className={styles.collapse}
            bordered={false}
            activeKey={state.openedCubes}
            defaultActiveKey={state.openedCubes}
            onChange={onCollapse}
            expandIcon={({ isActive }) => (
              <RightOutlined rotate={isActive ? -90 : 0} />
            )}
          >
            {options}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default ExploreCubes;
