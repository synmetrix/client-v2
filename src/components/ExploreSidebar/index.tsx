import { Collapse, Badge, Radio, Input, Alert } from "antd";
// import { UpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
// import cn from "classnames";

// import Select from "@/components/Select";
// import { capitalize } from "@/utils/helpers/capitalize";
import useCubesList from "@/hooks/useCubesList";
import ExploreCubesSection from "@/components//ExploreCubesSection";
import type { Cube, Metric } from "@/types/cube";

import SearchIcon from "@/assets/search.svg";

import styles from "./index.module.less";

import type { ChangeEventHandler, FC } from "react";
import type { RadioChangeEvent, AlertProps } from "antd";

interface ExploreSidebarProps {
  onMemberSelect: any;
  availableQueryMembers: Record<string, Cube>;
  selectedQueryMembers: Record<string, Metric>;
  dataSchemaValidation: {
    code: string;
    message: string;
    error?: {
      message: string;
    };
  };
}

// const { TabPane } = Tabs;
const { Panel } = Collapse;

export const SHOWN_CATEGORIES = ["dimensions", "measures", "segments"];

const ExploreSidebar: FC<ExploreSidebarProps> = ({
  onMemberSelect,
  availableQueryMembers,
  selectedQueryMembers,
  dataSchemaValidation,
}) => {
  const { t } = useTranslation(["explore", "common"]);

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
          (acc: Metric[], item: Metric) => {
            const isMemberExists = !!acc.find(
              (accItem: Metric) =>
                accItem.dimension === item.dimension &&
                accItem.granularity == item.granularity
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

      <Input
        className={styles.searchInput}
        bordered={false}
        prefix={<SearchIcon />}
        placeholder="Find..."
        onChange={onChange}
        allowClear
      />

      <div>
        {dataSchemaValidation?.error && <Alert {...dataSchemaError} />}
        <Collapse
          className={styles.collapse}
          bordered={false}
          activeKey={state.openedCubes}
          defaultActiveKey={state.openedCubes}
          onChange={onCollapse}
        >
          {options}
        </Collapse>
      </div>
    </div>
  );

  // const selectedDataBase = dataBases.find((d) => d.name === selected);

  // const renderCollapseIcon = (isActive?: boolean) => (
  //   <UpOutlined
  //     className={cn(styles.collapseIcon, { [styles.collapseOpen]: !isActive })}
  //   />
  // );

  // const renderPanelHeader = (count: number, name: string) => (
  //   <div className={styles.panelHeader}>
  //     {name}
  //     <Badge className={styles.badge} count={count} showZero />
  //   </div>
  // );

  // return (
  //   <div className={styles.wrapper}>
  //     <Select
  //       className={styles.dataBaseSelect}
  //       options={dataBases.map((d) => ({
  //         label: d.name,
  //         value: d.name,
  //       }))}
  //       defaultValue={selectedDataBase?.name}
  //       value={selectedDataBase?.name}
  //       onChange={onDataBaseChange}
  //     />

  //     <Tabs centered>
  //       <TabPane tab={capitalize(t("common:words.all"))} key="1">
  //         <Space className={styles.space} direction="vertical" size={4}>
  //           {selectedDataBase &&
  //             Object.keys(selectedDataBase.tables).map((tb: string) => (
  //               <Collapse
  //                 className={styles.collapse}
  //                 key={tb}
  //                 bordered={false}
  //                 expandIcon={({ isActive }) => renderCollapseIcon(isActive)}
  //               >
  //                 <Panel
  //                   className={styles.panel}
  //                   header={renderPanelHeader(
  //                     selectedDataBase.tables[tb].measures.length +
  //                       selectedDataBase.tables[tb].deminsions.length,
  //                     tb
  //                   )}
  //                   key={tb}
  //                 >
  //                   <Space
  //                     className={styles.space}
  //                     direction="vertical"
  //                     size={14}
  //                   >
  //                     <div>
  //                       <span className={styles.collapseTitle}>
  //                         {t("common:words.dimensions")}
  //                       </span>
  //                       <ul className={styles.collapseBody}>
  //                         {selectedDataBase.tables[tb].measures.map((m) => (
  //                           <li key={m}>{m}</li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                     <div>
  //                       <span className={styles.collapseTitle}>
  //                         {t("common:words.measures")}
  //                       </span>
  //                       <ul className={styles.collapseBody}>
  //                         {selectedDataBase.tables[tb].deminsions.map((d) => (
  //                           <li key={d}>{d}</li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                   </Space>
  //                 </Panel>
  //               </Collapse>
  //             ))}
  //         </Space>
  //       </TabPane>
  //       <TabPane tab={capitalize(t("common:words.dimensions"))} key="2">
  //         <Space className={styles.space} direction="vertical" size={4}>
  //           {selectedDataBase &&
  //             Object.keys(selectedDataBase.tables).map((tb: string) => (
  //               <Collapse
  //                 className={styles.collapse}
  //                 key={tb}
  //                 bordered={false}
  //                 expandIcon={({ isActive }) => renderCollapseIcon(isActive)}
  //               >
  //                 <Panel
  //                   className={styles.panel}
  //                   header={renderPanelHeader(
  //                     selectedDataBase.tables[tb].deminsions.length,
  //                     tb
  //                   )}
  //                   key={tb}
  //                 >
  //                   <Space
  //                     className={styles.space}
  //                     direction="vertical"
  //                     size={14}
  //                   >
  //                     <div>
  //                       <span className={styles.collapseTitle}>
  //                         {t("common:words.dimensions")}
  //                       </span>
  //                       <ul className={styles.collapseBody}>
  //                         {selectedDataBase.tables[tb].measures.map((m) => (
  //                           <li key={m}>{m}</li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                   </Space>
  //                 </Panel>
  //               </Collapse>
  //             ))}
  //         </Space>
  //       </TabPane>
  //       <TabPane tab={capitalize(t("common:words.measures"))} key="3">
  //         <Space className={styles.space} direction="vertical" size={4}>
  //           {selectedDataBase &&
  //             Object.keys(selectedDataBase.tables).map((tb: string) => (
  //               <Collapse
  //                 className={styles.collapse}
  //                 key={tb}
  //                 bordered={false}
  //                 expandIcon={({ isActive }) => renderCollapseIcon(isActive)}
  //               >
  //                 <Panel
  //                   className={styles.panel}
  //                   header={renderPanelHeader(
  //                     selectedDataBase.tables[tb].measures.length,
  //                     tb
  //                   )}
  //                   key={tb}
  //                 >
  //                   <Space
  //                     className={styles.space}
  //                     direction="vertical"
  //                     size={14}
  //                   >
  //                     <div>
  //                       <span className={styles.collapseTitle}>
  //                         {t("common:words.measures")}
  //                       </span>
  //                       <ul className={styles.collapseBody}>
  //                         {selectedDataBase.tables[tb].deminsions.map((d) => (
  //                           <li key={d}>{d}</li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                   </Space>
  //                 </Panel>
  //               </Collapse>
  //             ))}
  //         </Space>
  //       </TabPane>
  //     </Tabs>
  //   </div>
  // );
};

export default ExploreSidebar;
