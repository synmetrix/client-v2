import { Radio } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useSetState } from "ahooks";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import PopoverButton from "@/components/PopoverButton";
import SimpleForm from "@/components/SimpleForm";

import CSVIcon from "@/assets/csv.svg";

import s from "./index.module.less";

import type { FC } from "react";
import type { RadioChangeEvent } from "antd";

const ExploreDataSection: FC = () => {
  const { t } = useTranslation();

  const [currState, updateState] = useSetState({
    section: 0,
  });

  const formConfig = {
    rows: {
      section: t("Query"),
      label: t("Rows Limit"),
      type: "number",
      defaultValue: 0,
    },
    offset: {
      section: t("Query"),
      label: t("Additional Offset"),
      type: "number",
      defaultValue: 0,
    },
    hideCubeNames: {
      section: t("Settings"),
      label: t("Hide Cube Names"),
      type: "checkbox",
    },
    hideIndexColumn: {
      section: t("Settings"),
      label: t("Hide Index Column"),
      type: "checkbox",
    },
  };

  const onRadioClick = (e: RadioChangeEvent) => {
    const { target } = e;

    updateState({
      section: target.value,
    });

    // onSectionChange(e);
  };

  return (
    <div className={s.header}>
      <div>
        <Button
          className={s.dataBtn}
          type="dashed"
          // onClick={() => onToggleSection("dataSec")}
        >
          {t("Data")}
        </Button>

        <Radio.Group
          value={currState.section}
          onChange={onRadioClick}
          // disabled={disableSectionChange}
          // className={s.buttonGroup}
        >
          <Radio.Button value="results">{t("Results")}</Radio.Button>
          <Radio.Button value="sql">{t("SQL")}</Radio.Button>
        </Radio.Group>

        <div style={{ display: "inline-block", marginLeft: 10 }}>
          <PopoverButton
            icon={<SettingOutlined />}
            style={{
              borderColor: "transparent",
              boxShadow: "none",
              color: "rgba(0, 0, 0, 0.25)",
            }}
            placement="bottom"
            buttonProps={{
              size: "middle",
            }}
            content={
              <div className={s.popoverInner}>
                <SimpleForm
                  config={formConfig}
                  onSubmit={console.log}
                  autoSubmit
                />
              </div>
            }
            trigger="click"
          />
        </div>
      </div>

      <div>
        <Button className={s.csvBtn}>
          <div className={s.csvText}>Export .CSV</div>{" "}
          <CSVIcon className={s.csvIcon} />
        </Button>

        <Button type="primary">+ New</Button>
      </div>
    </div>
  );
};

export default ExploreDataSection;
